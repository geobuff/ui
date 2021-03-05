import React from "react";
import { Box, Fade, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

const subHeaderText =
  "Create an account and compete with players from all over the globe!";

const HeroBanner = () => {
  const shouldDisplayOnMobile = useBreakpointValue({
    base: false,
    sm: false,
    md: true,
  });

  return (
    <Box
      role="banner"
      background={[
        "linear-gradient(90deg, #44D581 0%, #1BA254 100%)",
        "linear-gradient(90deg, #44D581 0%, #1BA254 100%)",
        "linear-gradient(90deg, #44D581 0%, #27AE60 100%)",
      ]}
      height={["260px", "300px", "420px"]}
      width="100%"
    >
      <Box
        height="100%"
        background={shouldDisplayOnMobile ? "url(/world-map.svg)" : "none"}
        backgroundRepeat="no-repeat"
        backgroundSize="650px 350px"
        backgroundPosition="right -30px top 40px"
      >
        <Flex
          direction="column"
          padding={[3, 6, 12]}
          height="100%"
          justifyContent="center"
          alignItems={{ sm: "center", md: "flex-start" }}
          textAlign={["center", "center", "left"]}
        >
          <Fade in>
            <Text
              fontSize={["42px", "42px", "56px"]}
              fontWeight="black"
              lineHeight="1.25"
            >
              {"Get your geo flex on"}
            </Text>

            <Box marginY={5} maxWidth={{ sm: "400px", md: "450px" }}>
              <Text fontSize={["18px", "18px", "24px"]} fontWeight="bold">
                {subHeaderText}
              </Text>
            </Box>
          </Fade>
        </Flex>
      </Box>
    </Box>
  );
};

HeroBanner.propTypes = {};
HeroBanner.defaultProps = {};

export default HeroBanner;
