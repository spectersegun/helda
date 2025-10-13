import { motion } from "framer-motion";

const AIBlobVideo = ({
  classNameWrapper,
  className,
}: {
  classNameWrapper?: string;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`grid place-items-center !mb-2 !py-5 ${classNameWrapper}`}
    >
      <div className="w-[200px] max-w-full h-[200px] aspect-[1/1] overflow-hidden rounded-full relative">
        <video
          src="/assets/AIBlob.web.mp4"
          autoPlay
          loop
          muted
          playsInline
          className={`w-[750px] h-auto  object-cover object-center origin-center [transform:scale(4.65)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </motion.div>
  );
};

export default AIBlobVideo;
