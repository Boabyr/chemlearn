import { course as organicChemistry } from "../courses/organic-chemistry/index";

const courseTopicLoaders: Record<string, Record<string, () => Promise<any>>> = {
  "organic-chemistry": {
    "01-introduction":               () => import("../courses/organic-chemistry/topics/01-introduction"),
    "02-pyridines":                  () => import("../courses/organic-chemistry/topics/02-pyridines"),
    "03-five-ring-one-heteroatom":   () => import("../courses/organic-chemistry/topics/03-five-ring-one-heteroatom"),
    "04-five-ring-two-heteroatoms":  () => import("../courses/organic-chemistry/topics/04-five-ring-two-heteroatom"),
    "05-cycloadditions":             () => import("../courses/organic-chemistry/topics/05-cycloadditions"),
    "06-cyclocondensations":         () => import("../courses/organic-chemistry/topics/06-cyclocondensations"),
    "07-sear-regioselectivity":      () => import("../courses/organic-chemistry/topics/07-sear-regioselectivity"),
    "08-mechanisms":                 () => import("../courses/organic-chemistry/topics/08-mechanisms"),
    "09-bioisosteres-skeletal-editing": () => import("../courses/organic-chemistry/topics/09-bioisosteres-skeletal-editing"),
  },
};

export const allCourses = [
  organicChemistry,
];

export async function loadTopic(courseId: string, topicId: string) {
  const loaders = courseTopicLoaders[courseId];
  if (!loaders) throw new Error(`Kurs nicht gefunden: ${courseId}`);
  const loader = loaders[topicId];
  if (!loader) throw new Error(`Thema nicht gefunden: ${topicId}`);
  const module = await loader();
  return module.topic ?? module.default;
}

export async function loadAllTopics(courseId: string) {
  const loaders = courseTopicLoaders[courseId];
  if (!loaders) throw new Error(`Kurs nicht gefunden: ${courseId}`);
  const topics = await Promise.all(
    Object.entries(loaders).map(async ([id, loader]) => {
      const module = await loader();
      return module.topic ?? module.default;
    })
  );
  return topics;
}
