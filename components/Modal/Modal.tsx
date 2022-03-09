import React, { FC, ReactNode, useEffect, useState } from "react";

import {
  Box,
  Flex,
  Modal as ChakraModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps as ChakraModalProps,
  useBreakpointValue,
  Heading,
  Button,
  ResponsiveValue,
} from "@chakra-ui/react";
import ArrowLeft from "../../Icons/ArrowLeft";

export interface ModalProps extends ChakraModalProps {
  header?: string | ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  hasCloseButton?: boolean;
  maxHeight: number | string | ResponsiveValue<string | any>;
  minWidth: number | string | ResponsiveValue<string | any>;
}

const Modal: FC<ModalProps> = ({
  header,
  body,
  children,
  footer,
  hasCloseButton = false,
  maxHeight,
  minWidth,
  isOpen,
  onClose,
  ...props
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [shouldDisplay, setShouldDisplay] = useState(false);

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    setTimeout(() => {
      setShouldAnimate(isOpen);
    }, 200);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setShouldDisplay(false);
      }, 1000);
    } else {
      setShouldDisplay(true);
    }
  }, [isOpen]);

  // Prevent layout shifts on load
  if (isMobile === undefined) {
    return null;
  }

  return (
    <>
      {isMobile ? (
        <Box
          display={!shouldDisplay ? "none" : "inherit"}
          backgroundColor="white"
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={1000}
          opacity={shouldAnimate ? 1 : 0}
          transition="all 250ms ease-in-out"
        >
          <Flex
            direction="column"
            justifyContent="space-between"
            height="100%"
            width="100%"
            overflowY="scroll"
          >
            <Box height="100%" overflowY="scroll">
              {!!header && (
                <>
                  {React.isValidElement(header) ? (
                    header
                  ) : (
                    <>
                      {hasCloseButton ? (
                        <Flex
                          alignItems="center"
                          justifyContent="space-between"
                          marginTop={4}
                          marginLeft={4}
                          marginBottom={10}
                        >
                          <Button
                            variant="link"
                            leftIcon={<ArrowLeft height={5} width={5} />}
                            paddingX={10}
                            fontWeight="bold"
                            color="black"
                            onClick={onClose}
                            {...props}
                          >
                            <Heading size="md" fontWeight="bold">
                              {header}
                            </Heading>
                          </Button>
                        </Flex>
                      ) : (
                        <Heading fontWeight="bold" p={6}>
                          {header}
                        </Heading>
                      )}
                    </>
                  )}
                </>
              )}

              {children || body}
            </Box>
            {!!footer && (
              <>
                <Box height="90px" />
                <Box
                  position="fixed"
                  left={0}
                  right={0}
                  bottom={0}
                  backgroundColor="white"
                  borderTop="2px solid"
                  borderColor="gray.100"
                  p={5}
                >
                  <Flex justifyContent="flex-end">{footer}</Flex>
                </Box>
              </>
            )}
          </Flex>
        </Box>
      ) : (
        <ChakraModal isOpen={isOpen} onClose={onClose} isCentered {...props}>
          <ModalOverlay />
          <ModalContent
            borderRadius="12px"
            minWidth={minWidth}
            maxHeight={maxHeight}
            overflowY="scroll"
          >
            {!!header && (
              <>
                {React.isValidElement(header) ? (
                  header
                ) : (
                  <ModalHeader>{header}</ModalHeader>
                )}
              </>
            )}

            <ModalBody padding={0}>{children || body}</ModalBody>
            {!!footer && <ModalFooter mb={2}>{footer}</ModalFooter>}
          </ModalContent>
        </ChakraModal>
      )}
    </>
  );
};

export default Modal;
