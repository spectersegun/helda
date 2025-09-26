export default function EmptyQuestion() {
  return (
    <div className="max-w-[400px]  !space-y-4 !mx-auto text-[#12428D] !mt-16">
      <div className="!py-2 !border !border-[#12428D] rounded-lg cursor-pointer ">
        <p className="!text-center !mb-0 !font-medium !text-sm !max-w-[320px] !mx-auto">
          What&apos;s our average charge for a knee replacement?
        </p>
      </div>
      <div className="!py-2 !border !border-[#12428D] rounded-lg cursor-pointer ">
        <p className="!text-center !mb-0 !font-medium !text-sm !max-w-[320px] !mx-auto">
          Which services had the biggest charge variation in April?
        </p>
      </div>
      <div className="!py-2 !border !border-[#12428D] rounded-lg cursor-pointer ">
        <p className="!text-center !mb-0 !font-medium !text-sm !max-w-[320px] !mx-auto">
          "How do our maternity service charges compare to other hospitals?"
        </p>
      </div>
    </div>
  );
}
