/**
 * Data Context for switching between hospital and dental CSV data
 * based on user login type
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export interface DataRow {
  patient_id: string;
  gender: string;
  age: string;
  visit_date: string;
  department: string;
  physician_id: string;
  diagnosis: string;
  visit_type: string;
  visit_reason: string;
  appointment_id: string;
  is_emergency: string;
  insurance_id: string;
  payer_name: string;
  payer_type: string;
  claim_status: string;
  charge_amount_USD: string;
  payment_amount_USD: string;
  admission_date: string;
  discharge_date: string;
}

interface DataContextType {
  data: DataRow[];
  isLoading: boolean;
  error: string | null;
  dataSource: "hospital" | "dental" | null;
  getDataSummary: () => string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [data, setData] = useState<DataRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<"hospital" | "dental" | null>(null);

  /**
   * Parse CSV data
   */
  const parseCSV = (csvText: string): DataRow[] => {
    const lines = csvText.trim().split("\n");
    const headers = lines[0].split(",");

    return lines.slice(1).map((line) => {
      const values = line.split(",");
      const row: any = {};

      headers.forEach((header, index) => {
        row[header.trim()] = values[index]?.trim() || "";
      });

      return row as DataRow;
    });
  };

  /**
   * Load data based on user role
   */
  useEffect(() => {
    if (!user || !user.role) {
      setData([]);
      setDataSource(null);
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let csvFile = "";

        // Determine which CSV to load based on user role
        if (user.role === "hospital") {
          csvFile = "/src/data/hospital_dummy_data.csv";
          setDataSource("hospital");
        } else if (user.role === "dentist") {
          csvFile = "/src/data/dental_dummy_data.csv";
          setDataSource("dental");
        } else {
          // Default to hospital for pharmacy or unknown roles
          csvFile = "/src/data/hospital_dummy_data.csv";
          setDataSource("hospital");
        }

        const response = await fetch(csvFile);
        if (!response.ok) {
          throw new Error(`Failed to load ${csvFile}`);
        }

        const csvText = await response.text();
        const parsedData = parseCSV(csvText);
        setData(parsedData);
      } catch (err) {
        console.error("Error loading CSV data:", err);
        setError(err instanceof Error ? err.message : "Failed to load data");
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user?.role]);

  /**
   * Generate a summary of the data for LLM context
   */
  const getDataSummary = (): string => {
    if (data.length === 0) return "No data available.";

    // Calculate summary statistics
    const totalRecords = data.length;
    const departments = [...new Set(data.map((d) => d.department))];
    const diagnoses = [...new Set(data.map((d) => d.diagnosis).filter(Boolean))];
    
    // Calculate revenue metrics
    const totalRevenue = data.reduce((sum, row) => {
      const charge = parseFloat(row.charge_amount_USD) || 0;
      return sum + charge;
    }, 0);

    const avgRevenue = totalRevenue / totalRecords;

    // Department revenue breakdown
    const deptRevenue: Record<string, number> = {};
    data.forEach((row) => {
      const dept = row.department;
      const charge = parseFloat(row.charge_amount_USD) || 0;
      deptRevenue[dept] = (deptRevenue[dept] || 0) + charge;
    });

    const topDepartments = Object.entries(deptRevenue)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([dept, rev]) => `${dept}: $${rev.toFixed(2)}`)
      .join(", ");

    // Patient demographics
    const maleCount = data.filter((d) => d.gender === "Male").length;
    const femaleCount = data.filter((d) => d.gender === "Female").length;

    // Visit types
    const inpatientCount = data.filter((d) => d.visit_type === "Inpatient").length;
    const outpatientCount = data.filter((d) => d.visit_type === "Outpatient").length;

    // Claim statuses
    const claimStatuses: Record<string, number> = {};
    data.forEach((row) => {
      const status = row.claim_status;
      claimStatuses[status] = (claimStatuses[status] || 0) + 1;
    });

    const summary = `
Data Source: ${dataSource === "hospital" ? "Hospital" : "Dental Clinic"} Healthcare Data
Total Records: ${totalRecords.toLocaleString()}
Data Period: ${data[0]?.visit_date} to ${data[data.length - 1]?.visit_date}

Departments (${departments.length}): ${departments.slice(0, 10).join(", ")}${departments.length > 10 ? "..." : ""}

Financial Metrics:
- Total Revenue: $${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
- Average Revenue per Visit: $${avgRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
- Top Revenue Departments: ${topDepartments}

Patient Demographics:
- Male: ${maleCount} (${((maleCount / totalRecords) * 100).toFixed(1)}%)
- Female: ${femaleCount} (${((femaleCount / totalRecords) * 100).toFixed(1)}%)

Visit Types:
- Inpatient: ${inpatientCount} (${((inpatientCount / totalRecords) * 100).toFixed(1)}%)
- Outpatient: ${outpatientCount} (${((outpatientCount / totalRecords) * 100).toFixed(1)}%)

Claim Statuses:
${Object.entries(claimStatuses)
  .map(([status, count]) => `- ${status}: ${count} (${((count / totalRecords) * 100).toFixed(1)}%)`)
  .join("\n")}

Top Diagnoses (sample): ${diagnoses.slice(0, 10).filter(Boolean).join(", ")}
`;

    return summary.trim();
  };

  const value = {
    data,
    isLoading,
    error,
    dataSource,
    getDataSummary,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
