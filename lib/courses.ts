export const courses = [
  {
    slug: "isogeny-reading-group",
    title: "Isogeny Reading Group",
    description: "Lecture notes and discussions from the Isogeny Reading Group.",
    topics: ["isogenies", "elliptic-curves", "cryptography"],
  },
];

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}
