import {
  getStandardsForCourse as getMathStandards,
  getDomainsForCourse as getMathDomains,
  getStandardById as getMathStandardById,
} from "./ma-standards";
import {
  getChemistryStandardsForCourse,
  getChemistryDomainsForCourse,
  getChemistryStandardById,
} from "./chemistry-standards";
import { getSubjectForCourse } from "@/lib/constants";

export type { Standard, DomainGroup, CourseStandards } from "./ma-standards";

export function getStandardsForCourse(courseName: string) {
  const subject = getSubjectForCourse(courseName);
  if (subject === "Chemistry") return getChemistryStandardsForCourse(courseName);
  return getMathStandards(courseName);
}

export function getDomainsForCourse(courseName: string) {
  const subject = getSubjectForCourse(courseName);
  if (subject === "Chemistry") return getChemistryDomainsForCourse(courseName);
  return getMathDomains(courseName);
}

export function getStandardById(id: string) {
  return getMathStandardById(id) ?? getChemistryStandardById(id);
}

export function getStandardsByIds(ids: string[]) {
  return ids.map((id) => getStandardById(id)).filter((s): s is NonNullable<typeof s> => !!s);
}
