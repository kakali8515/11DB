export default [
  {
    label: "Edit",
    icon: new URL("../assets/icons/ad-icon1.svg", import.meta.url),
    subCategory: [
      {
        label: "List",
        key: ["List"],
        icon: new URL("../assets/icons/sub-icon4.svg", import.meta.url),
        redirectionLink: "/edit-list",
      },
      // {
      //   label: "Review",
      //   key: [],
      //   icon: new URL("../assets/icons/sub-icon5.svg", import.meta.url),
      //   redirectionLink: "",
      // },
      // {
      //   label: "Malling",
      //   key: [],
      //   icon: new URL("../assets/icons/sub-icon6.svg", import.meta.url),
      //   redirectionLink: "",
      // },
      {
        label: "Awards",
        key: [
          "AwardList",
          "AwardEditBasicInfo",
          "AwardSectorAdd",
          "AwardAddRound",
          "AwardEdit",
          "AddNominee",
        ],
        icon: new URL("../assets/icons/sub-icon7.svg", import.meta.url),
        redirectionLink: "/AwardList",
      },
    ],
  },
  {
    label: "News",
    icon: new URL("../assets/icons/news-icon.svg", import.meta.url),
    subCategory: [
      {
        label: "News Manager",
        key: ["NewsManager"],
        icon: new URL("../assets/icons/sub-icon1.svg", import.meta.url),
        redirectionLink: "/news-manager",
      },
    ],
  },

  {
    label: "Dictionary",
    icon: new URL("../assets/icons/ad-icon3.svg", import.meta.url),
    subCategory: [
      {
        label: "Tag-Data",
        key: [
          "TagData",
          "AddMainCategory",
          "AddSubCategory",
          "AddTag",
          "EditTag",
        ],
        icon: new URL("../assets/icons/sub-icon2.svg", import.meta.url),
        redirectionLink: "/tag-data",
      },
      {
        label: "Agency",
        key: ["AgentList", "AgentAdd", "AgentDetails", "AgentEdit"],
        icon: new URL("../assets/icons/sub-icon3.svg", import.meta.url),
        redirectionLink: "/agent-list",
      },
    ],
  },
  {
    label: "Bulk Working",
    icon: new URL("../assets/icons/ad-icon5.svg", import.meta.url),
    subCategory: [
      {
        label: "Worklist",
        key: ["Worklist"],
        icon: new URL("../assets/icons/sub-icon8.svg", import.meta.url),
        redirectionLink: "/worklist",
      },
      {
        label: "Import",
        key: ["ImportList", "ImportUpload", "ImportStatus"],
        icon: new URL("../assets/icons/sub-icon9.svg", import.meta.url),
        redirectionLink: "/import-list",
      },
      {
        label: "Export",
        key: ["ExportList"],
        icon: new URL("../assets/icons/sub-icon10.svg", import.meta.url),
        redirectionLink: "/export-list",
      },
    ],
  },
  {
    label: "Data Management",
    icon: new URL("../assets/icons/ad-icon6.svg", import.meta.url),
    subCategory: [
      // {
      //   label: "Schema",
      //   key: [],
      //   icon: new URL("../assets/icons/sub-icon11.svg", import.meta.url),
      //   redirectionLink: "",
      // },
      {
        label: "Priority",
        icon: new URL("../assets/icons/sub-icon12.svg", import.meta.url),
        key: ["Priority"],
        redirectionLink: "/priority",
      },
      // {
      //   label: "Data Item",
      //   key: [],
      //   icon: new URL("../assets/icons/sub-icon13.svg", import.meta.url),
      //   redirectionLink: "",
      // },
    ],
  },
  {
    label: "Setting",
    icon: new URL("../assets/icons/ad-icon7.svg", import.meta.url),
    subCategory: [
      {
        label: "Front lists",
        key: [
          "FrontLists",
          "FrontListsPolicyDetails",
          "FrontListsAddPolicy",
          "NewsEdit",
        ],
        icon: new URL("../assets/icons/sub-icon14.svg", import.meta.url),
        redirectionLink: "/FrontLists",
      },
      {
        label: "User Management",
        key: ["UserManagementList", "UserManagementAddUser", "UserManagementDetails"],
        icon: new URL("../assets/icons/sub-icon15.svg", import.meta.url),
        redirectionLink: "/UserManagementList",
      },
    ],
  },
  {
    label: "Admin Analytics",
    icon: new URL("../assets/icons/ad-icon8.svg", import.meta.url),
    subCategory: [
      {
        label: "DB Content",
        key: ["DbContent"],
        icon: new URL("../assets/icons/sub-icon16.svg", import.meta.url),
        redirectionLink: "/dbContent",
      },
      {
        label: "User Feedback Report",
        key: ["UserFeedbackReport"],
        icon: new URL("../assets/icons/sub-icon17.svg", import.meta.url),
        redirectionLink: "/user-feedback-report",
      },
      {
        label: "Community Report",
        key: ["UserCommunityReport"],
        icon: new URL("../assets/icons/sub-icon18.svg", import.meta.url),
        redirectionLink: "/community-report",
      },
      {
        label: "Google Analytics",
        key: [],
        icon: new URL("../assets/icons/sub-icon19.svg", import.meta.url),
        redirectionLink: "",
      },
      {
        label: "Statistics / User behaviour Log",
        key: ["UserStatistics"],
        icon: new URL("../assets/icons/sub-icon20.svg", import.meta.url),
        redirectionLink: "/user-statistic",
      },
    ],
  },
  {
    label: "Statistics",
    icon: new URL("../assets/icons/ad-icon9.svg", import.meta.url),
    subCategory: [
      {
        label: "Statistics / User behaviour Log",
        key: ["UserStatistics"],
        icon: new URL("../assets/icons/sub-icon20.svg", import.meta.url),
        redirectionLink: "/user-statistic",
      },
    ],
  },
];
