import React from "react";
import { Result } from "../../types/result";
import ResultsList, { Props } from "./ResultsList";

export default {
  title: "UI/ResultsList",
  component: ResultsList,
};

const Template = (args: Props): React.ReactNode => <ResultsList {...args} />;

const results: Result[] = [
  {
    name: "afghanistan",
    code: "AS",
    flagUrl: "https://twemoji.maxcdn.com/v/13.0.1/svg/1f1e6-1f1eb.svg",
    svgName: "Afghanistan",
    isHidden: false,
    isMissedResult: false,
  },
  {
    name: "australia",
    code: "AU",
    flagUrl: "https://twemoji.maxcdn.com/v/13.0.1/svg/1f1e6-1f1fa.svg",
    svgName: "Australia",
    isHidden: false,
    isMissedResult: true,
  },
  {
    name: "new zealand",
    code: "NZ",
    flagUrl: "https://twemoji.maxcdn.com/v/13.0.1/svg/1f1f3-1f1ff.svg",
    svgName: "New Zealand",
    isHidden: false,
    isMissedResult: true,
  },
];

export const HasFlags = Template.bind({});
export const NoFlags = Template.bind({});

HasFlags.args = {
  results,
  plural: "countries",
  hasFlags: true,
};

NoFlags.args = {
  results,
  plural: "countries",
  hasFlags: false,
};
