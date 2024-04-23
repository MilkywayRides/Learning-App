import { Chapter, Course, UserProgress } from "@prisma/client"

import { NavbarRoutes } from "@/components/navbar-routes";

import { CourseMobileSidebar } from "./course-mobile-sidebar";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
};

export const CourseNavbar = ({
  course,
  progressCount,
}: CourseNavbarProps) => {
  return (
    <div className="p-4 bg-gradient-to-b from-transparent backdrop-blur-md bg-opacity-75 border-b h-4/6 flex items-center bg-white shadow-sm  dark:bg-gradient-to-b dark:from-transparent dark:backdrop-blur-md dark:bg-opacity-75 dark:border-b dark:bg-[#0c0a09] dark:shadow-sm">
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
      />
      <NavbarRoutes />      
    </div>
  )
}
