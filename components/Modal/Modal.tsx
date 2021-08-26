import React, { useEffect, useState, FC } from "react";

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

interface Props {
  header?: string | React.ReactNode;
  footer?: string | React.ReactNode;
  isOpen?: boolean;
  onClose?: any;
  [x: string]: any;
}

const Modal: FC<Props> = ({
  header = null,
  footer = null,
  isOpen = false,
  onClose = () => {},
  children,
  ...props
}) => {
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
          <Flex
            direction="column"
            justifyContent="space-between"
            height="100%"
            width="100%"
          >
            <Box height="100%">
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
            {!!footer && <ModalFooter marginBottom={1}>{footer}</ModalFooter>}
          </ModalContent>
        </ChakraModal>
      )}
    </>
  );
};

export default Modal;
