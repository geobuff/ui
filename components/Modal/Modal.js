import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  Box,
  Flex,
  Modal as ChakraModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";

const Modal = ({ header, footer, isOpen, onClose, children, ...props }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isOpenDelayed, setIsOpenDelayed] = useState(false);

  const isMobile = useBreakpointValue({ base: true, md: false });

  // TODO: km - consider renaming props to
  // properly reflect their purpose
  useEffect(() => {
    setTimeout(() => {
      setShouldAnimate(isOpen);
    }, 200);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsOpenDelayed(false);
      }, 1000);
    } else {
      setIsOpenDelayed(true);
    }
  }, [isOpen]);

  //   Prevent flickering on load
  if (isMobile === undefined) {
    return null;
  }

  return (
    <>
      {isMobile ? (
        <Box
          display={!isOpenDelayed ? "none" : "inherit"}
          backgroundColor="white"
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={1000}
          opacity={shouldAnimate ? 1 : 0}
          transition="all 250ms ease-in-out"
          {...props}
        >
          <Flex direction="column" justifyContent="space-between" height="100%">
            <Box>
              {!!header && (
                <>
                  {React.isValidElement(header) ? (
                    header
                  ) : (
                    <Heading fontWeight="bold" margin={6}>
                      {header}
                    </Heading>
                  )}
                </>
              )}

              {children}
            </Box>
            {!!footer && (
              <Flex margin={6} justifyContent="flex-end">
                {footer}
              </Flex>
            )}
          </Flex>
        </Box>
      ) : (
        <ChakraModal isOpen={isOpen} onClose={onClose} {...props}>
          <ModalOverlay />
          <ModalContent borderRadius="12px">
            {!!header && (
              <>
                {React.isValidElement(header) ? (
                  header
                ) : (
                  <ModalHeader>{header}</ModalHeader>
                )}
              </>
            )}

            <ModalBody padding={0}>{children}</ModalBody>
            {!!footer && <ModalFooter>{footer}</ModalFooter>}
          </ModalContent>
        </ChakraModal>
      )}
    </>
  );
};

Modal.propTypes = {
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
};
Modal.defaultProps = {
  header: null,
  footer: null,
  isOpen: false,
  onClose: () => {},
  children: null,
};

export default Modal;
