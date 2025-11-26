import clsx from "clsx";

export const Section = () => {
   return (
      <div
         // style={styles}
         className={clsx(
            "relative p-6 max-w-full mx-auto w-[90%] h-full overflow-y-auto flex flex-col border-blue-500 border-solid text-5xl ",
         )}
      >
         Section
      </div>
   );
};
