const WidgetsData = (data) => [
  {
    id: 1,
    title: "Number of Users",
    price: data?.totalEmployees,
    rank: `${
      data?.monthlyEmployeeCountChanges?.split(" ")[1] === "Decreased"
        ? "-"
        : "+"
    } ${data?.monthlyEmployeeCountChanges}`,
    isDoller: false,
    statusColor: `${
      data?.monthlyEmployeeCountChanges?.split(" ")[1] === "Decreased"
        ? "danger"
        : "success"
    }`,
    series: [2, 10, 18, 22, 36, 15, 47, 75, 65, 19, 14, 2, 47, 42, 15],
    expiry: `${data?.expiredEmployees} User(s) Expired`,
  },
  {
    id: 2,
    title: "Number of Assets",
    price: data?.totalAssets,
    rank: `${
      data?.monthlyAssetCountChanges?.split(" ")[1] === "Decreased" || null
        ? "-"
        : "+"
    } ${data?.monthlyAssetCountChanges}`,
    isDoller: false,
    statusColor: `${
      data?.monthlyAssetCountChanges?.split(" ")[1] === "Decreased" || null
        ? "danger"
        : "success"
    }`,
    series: [15, 42, 47, 2, 14, 19, 65, 75, 47, 15, 42, 47, 2, 14, 12],
    expiry: `${data?.expiredAssets} Asset(s) Expired`,
  },
  {
    id: 3,
    title: "Number of User Tickets",
    price: 432,
    rank: "+30 Tickets",
    isDoller: false,
    // postFix: "M",
    statusColor: "success",
    series: [47, 15, 2, 67, 22, 20, 36, 60, 60, 30, 50, 11, 12, 3, 8],
  },
  {
    id: 4,
    title: "User Audits",
    price: 503,
    rank: "+207 Modifications",
    isDoller: false,
    postFix: "",
    statusColor: "success",
    series: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14, 2, 47, 42, 15],
  },
];

export { WidgetsData };
