import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const usePrevious = (value) => {
  const previousValueRef = useRef();

  useEffect(() => {
    previousValueRef.current = value;
  }, [value]);

  return previousValueRef.current;
};

const BottomSheet = ({ isOpen = true, onClose, onOpen, children }) => {
  const prevIsOpen = usePrevious(isOpen);
  const controls = useAnimation();

  // useMotionValue

  function onDragEnd(event, info) {
    const shouldClose =
      info.velocity.y > 20 || (info.velocity.y >= 0 && info.point.y > 45);
    if (shouldClose) {
      controls.start("hidden");
      onClose();
    } else {
      controls.start("visible");
      // onOpen();
    }
  }

  useEffect(() => {
    if (prevIsOpen && !isOpen) {
      controls.start("hidden");
    } else if (!prevIsOpen && isOpen) {
      controls.start("visible");
    }
  }, [controls, isOpen, prevIsOpen]);

  const variants = {
    open: { top: "20%" },
    closed: { top: "calc(100% - 300px)" },
  };

  console.log(isOpen, "isOpen");

  return (
    <motion.div
      // drag="y"
      // onDragEnd={onDragEnd}
      // initial="hidden"
      // initial={{ x: "90%" }}
      animate={isOpen ? "open" : "closed"}
      // animate={controls}
      variants={variants}
      transition={{
        type: "spring",
        damping: 40,
        stiffness: 400,
      }}
      // variants={{
      //   visible: { y: 0 },
      //   hidden: { y: "100%" },
      // }}
      dragConstraints={{ top: 0 }}
      dragElastic={0.2}
      style={{
        display: "inline-block",
        backgroundColor: "white",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        // top: "0%",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
      }}
    >
      {children}
    </motion.div>
  );
};

export default BottomSheet;
