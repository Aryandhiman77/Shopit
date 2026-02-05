const SkeletonImage = () => {
  return (
    <div
      className={`h-full w-[25vw] hover:scale-110 transition-all ease-in-out duration-500 object-contain bg-gray-300 aspect-square shimmer flex justify-center items-center`}
    />
  );
};

export const SkeletonText = ({ width = "100%", className = "" }) => {
  return (
    <div
      aria-hidden="true"
      className={`bg-gray-300 rounded-md h-[1em] ${className} shimmer`}
      style={{ width }}
    />
  );
};

export default SkeletonImage;
