import { motion } from "framer-motion";

const AIBlobVideo = ({
  classNameWrapper,
  className,
  delay = 0,
}: {
  classNameWrapper?: string;
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1, ease: "easeOut", delay }}
      className={`grid place-items-center !mb-[0.761vh] !py-[1.952vh] ${classNameWrapper}`}
    >
      <div className="w-[10vw] max-w-full h-[18vh] aspect-[1/1] overflow-hidden rounded-full relative">
        <video
          src="/assets/AIBlob.web.mp4"
          autoPlay
          loop
          muted
          playsInline
          className={`w-[37vw] h-auto  object-cover object-center origin-center [transform:scale(4.65)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </motion.div>
  );
};

export default AIBlobVideo;
