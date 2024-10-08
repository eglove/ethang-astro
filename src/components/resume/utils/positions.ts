// eslint-disable-next-line lodash/import-scope
import lodash from "lodash";
import forEach from "lodash/forEach.js";
import isNil from "lodash/isNil.js";
// eslint-disable-next-line barrel/avoid-importing-barrel-files
import { DateTime } from "luxon";

export const experienceStart = DateTime.fromObject({
  month: 11,
  year: 2018,
});

export const positions = {
  avatara: {
    endDate: "Mar 2022",
    methodologiesUsed: ["monorepo", "onPremHosting"],
    startDate: "Jul 2021",
    techUsed: [
      "webRtc",
      "webSockets",
      "graphQl",
      "nextJs",
      "react",
      "apollo",
      "nx",
      "node",
      "twilio",
      "prisma",
      "javascript",
      "typeScript",
      "sql",
      "htmlCss",
      "stencil",
      "rust",
      "webAssembly",
      "cSharpDotNet",
    ],
    title: "Contractor, Avatara",
  },
  centuryLink: {
    endDate: "Dec 2020",
    methodologiesUsed: ["agile"],
    startDate: "May 2020",
    techUsed: [
      "java",
      "springBoot",
      "apacheVelocity",
      "htmlCss",
      "vue",
      "javascript",
      "jira",
      "typeScript",
      "subversion",
    ],
    title: "Contractor, CenturyLink",
  },
  eightBase: {
    endDate: "May 2022",
    methodologiesUsed: ["agile"],
    startDate: "Mar 2022",
    techUsed: [
      "aws",
      "graphQl",
      "react",
      "sql",
      "node",
      "javascript",
      "typeScript",
      "typeGraphQl",
      "awsLambda",
      "htmlCss",
    ],
    title: "Contractor, 8base",
  },
  epa: {
    endDate: "Nov 2022",
    methodologiesUsed: ["rest", "agile", "tdd", "dependencyInjection"],
    startDate: "Jun 2022",
    techUsed: [
      "aws",
      "typeScript",
      "node",
      "sql",
      "nestJs",
      "typeOrm",
      "jest",
      "javascript",
      "redux",
      "react",
      "uswds",
      "github",
      "htmlCss",
    ],
    title: "Consultant, US Environmental Protection Agency (EPA)",
  },
  freelance2024: {
    endDate: "",
    methodologiesUsed: ["accessibility"],
    startDate: "May 2024",
    techUsed: [
      "react",
      "typeScript",
      "javascript",
      "tailwind",
      "htmlCss",
      "reactNative",
      "solid",
      "solidStart",
    ],
    title: "Contractor",
  },
  legrandAv: {
    endDate: "May 2024",
    methodologiesUsed: ["agile", "onPremHosting", "accessibility"],
    startDate: "Nov 2023",
    techUsed: [
      "azureAppService",
      "react",
      "nextJs",
      "typeScript",
      "javascript",
      "tailwind",
      "sitecore",
      "cSharpDotNet",
      "graphQl",
      "htmlCss",
      "redux",
    ],
    title: "Consultant, LegrandAV",
  },
  proagrica: {
    endDate: "May 2023",
    methodologiesUsed: [
      "agile",
      "accessibility",
      "rest",
      "tdd",
      "dependencyInjection",
    ],
    startDate: "Dec 2022",
    techUsed: [
      "react",
      "redux",
      "tailwind",
      "javascript",
      "reactTestingLibrary",
      "storybook",
      "cSharpDotNet",
      "dotNet",
      "entityFramework",
      "mediatR",
      "i18next",
      "node",
      "typeScript",
      "zod",
      "reactPdf",
      "jira",
      "esLint",
      "docker",
      "gitlab",
      "htmlCss",
    ],
    title: "Consultant, Proagrica",
  },
  prologue: {
    endDate: "Jul 2021",
    methodologiesUsed: ["rest"],
    startDate: "Jan 2021",
    techUsed: ["php", "yii", "vue", "laravel", "javascript", "htmlCss"],
    title: "Contractor, Prologue Technology",
  },
  seoConsulting: {
    endDate: "May 2020",
    methodologiesUsed: ["seo"],
    startDate: "Nov 2018",
    techUsed: ["react", "graphQl", "javascript", "node", "htmlCss"],
    title: "SEO Consulting/Freelancing",
  },
  stLouisCounty: {
    endDate: "Aug 2023",
    methodologiesUsed: [
      "accessibility",
      "rest",
      "mvc",
      "tdd",
      "composableDesign",
      "crabTesting",
      "onPremHosting",
      "dependencyInjection",
    ],
    startDate: "Jun 2023",
    techUsed: [
      "react",
      "playwright",
      "bootstrap",
      "cSharpDotNet",
      "dotNet",
      "entityFramework",
      "xUnit",
      "moq",
      "javascript",
      "typeScript",
      "htmlCss",
    ],
    title: "Consultant, St. Louis County",
  },
};

export const getExperience = () => {
  const experience: Record<string, number> = {};

  forEach(positions, (position) => {
    const { endDate, methodologiesUsed, startDate, techUsed } = position;

    const start = DateTime.fromFormat(startDate, "MMM yyyy");
    const end = isNil(endDate)
      ? DateTime.local()
      : DateTime.fromFormat(endDate, "MMM yyyy");

    const duration = end.diff(start, "months").months;

    const skillsUsed = [
      ...techUsed,
      ...methodologiesUsed,
    ] as unknown as typeof methodologiesUsed;
    for (const skill of skillsUsed) {
      const current = experience[skill];

      experience[skill] = (current ?? 0) + duration;
    }
  });

  return (
    // eslint-disable-next-line lodash/chaining,lodash/collection-method-value
    lodash
      .chain(experience)
      // eslint-disable-next-line unicorn/no-array-for-each
      .forEach((months, skill) => {
        if (!isNil(months) && 13 <= months) {
          experience[skill] = Number(months / 12);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete experience[skill];
        }
      })
      .map((_, skill) => {
        return {
          experience: experience[skill],
          skill,
        };
      })
      .orderBy(["experience"], ["desc"])
      .value()
  );
};
