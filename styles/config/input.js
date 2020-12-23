const input = {
  parts: ["field", "addon"],
  baseStyle: {
    field: {
      backgroundColor: "#FFFFFF",
      borderRadius: 25,
      fontWeight: 600,
      _focus: {
        borderWidth: 2,
        borderColor: "blue.500",
        zIndex: 1,
      },
      _placeholder: {
        color: "gray.500",
        opacity: 1,
      },
      _disabled: {
        backgroundColor: "gray.200",
        _placeholder: {
          color: "gray.300",
        },
      },
      _invalid: {
        borderColor: "red.200",
        borderWidth: 2,
        color: "red.400",
        _placeholder: {
          color: "red.200",
        },
      },
    },
  },
  sizes: {
    sm: {
      field: {
        height: "28px",
        fontSize: 14,
      },
    },
    md: {
      field: {
        height: "36px",
      },
    },
    lg: {
      field: {
        height: "44px",
      },
    },
  },
  variants: {
    default: {
      field: {
        background: "white",
        borderRadius: 25,
      },
    },
  },
  defaultProps: {
    variant: "default",
    size: "md",
  },
};

export default input;
