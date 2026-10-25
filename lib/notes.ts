import notes from "./generated-notes.json";
import type { LectureNote } from "./note-types";

export function getCourseNotes(course: string): LectureNote[] {
  return (notes as LectureNote[]).filter((note) => note.course === course);
}

export function getLectureNote(course: string, slug: string): LectureNote | undefined {
  return getCourseNotes(course).find((note) => note.slug === slug);
}
