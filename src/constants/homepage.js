import {
  healthConsultation,
  healthDiagnosis,
  healthPackage,
  Amarlab,
  PureHealth,
  Arogga,
  Hajj,
  MRI,
  CT,
  BMD,
  ECG,
  Lithotripsy,
} from "../assets";

export const ourTechnologies = [
  {
    id: 1,
    name: "MRI",
    image: MRI,
  },
  {
    id: 2,
    name: "CT",
    image: CT,
  },
  {
    id: 3,
    name: "BMD",
    image: BMD,
  },
  {
    id: 4,
    name: "ECG",
    image: ECG,
  },
  {
    id: 5,
    name: "Lithotripsy",
    image: Lithotripsy,
  },
];

export const servicePartners = [
  {
    id: 1,
    name: "Arogga,",
    icon: Arogga,
  },
  {
    id: 2,
    name: "Amarlab",
    icon: Amarlab,
  },
  {
    id: 3,
    name: "Hajj",
    icon: Hajj,
  },
  {
    id: 4,
    name: "PureHealth",
    icon: PureHealth,
  },
];

export const healthPakage = [
  {
    id: 1,
    name: "HEALTH DIAGNOSIS",
    description:
      "At Popular Diagnostic Centre Ltd., we offer precise and prompt diagnostic services using state-of-the-art technology and expert medical insight. Our commitment is to provide accurate health evaluations that form the foundation of effective treatment.",
    tags: [
      {
        name: "Indhaka",
        color: "blue-text-gradient",
      },
      {
        name: "Outsidedhaka",
        color: "green-text-gradient",
      },
    ],
    video: healthDiagnosis,
    source_code_link: "http://populardiagnostic.com/",
    link: "/",
  },
  {
    id: 2,
    name: "HEALTH CONSULTATION",
    description:
      "Popular Diagnostic Centre Ltd. offers expert health consultations tailored to your individual needs. Our experienced physicians provide clear, compassionate guidance, helping you make informed decisions about your health.",
    tags: [
      {
        name: "Indhaka",
        color: "blue-text-gradient",
      },
      {
        name: "Outsidedhaka",
        color: "green-text-gradient",
      },
    ],
    video: healthConsultation,
    source_code_link: "http://populardiagnostic.com/",
    link: "/our-doctors",
  },
  {
    id: 3,
    name: "HEALTH PACKAGES",
    description:
      "Discover a proactive approach to wellness with our specially designed health packages at Popular Diagnostic Centre Ltd. Each package is curated to offer comprehensive screenings for early detection and peace of mind.",
    tags: [
      {
        name: "Indhaka",
        color: "blue-text-gradient",
      },
      {
        name: "Outsidedhaka",
        color: "green-text-gradient",
      },
    ],
    video: healthPackage,
    source_code_link: "http://populardiagnostic.com/",
    link: "/health",
  },
];