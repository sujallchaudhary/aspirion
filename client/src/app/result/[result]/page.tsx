'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Brain, GraduationCap, BookOpen, Briefcase, ChevronRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

interface Result {
  modelResponse: string;
  collegeSuggestion: {
    degreeName: string;
    collegeName: string;
    location: string;
    degreeDuration: string;
    degreeDescription: string;
  }[];
  courseSuggestion: {
    courseName: string;
    courseLink: string;
    courseDuration: string;
    courseDescription: string;
  }[];
  careerPath: {
    recommendedIndustry: string;
    keypoints: {
      attribute: string;
      value: string;
      description: string;
      industryValue: string;
    }[];
  };
}
// const api=process.env.API
const fetchResult = async ({ modelId }: { modelId: string }): Promise<Result> => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/model/${modelId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  });
  const data = await response.json();
  return data;
};

export default function ResultPage({ params }: any) {
  const [result, setResult] = useState<Result | null>(null);

  const modelId = params?.result;
  console.log(modelId);

  useEffect(() => {
    if (modelId) {
      fetchResult({ modelId }).then((data:any) => {
        setResult(data.data);
        // setResult(data);
        console.log(data);
      }).catch(error => console.error("Error fetching result:", error));
    }
  }, [modelId]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-200">
      <Navbar />
      <div className="p-6">
        <header className="max-w-5xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            Your Career Assessment Results
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Based on your unique profile and preferences</p>
        </header>

        <main className="max-w-5xl mx-auto space-y-12">
          <section className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
              <Briefcase className="mr-2" />
              Recommended Career Path
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{result?.modelResponse}</p>
            <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 p-4 rounded-md">
              <span className="text-gray-900 dark:text-white font-medium">Recommended Industry</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                {result?.careerPath?.recommendedIndustry}
              </span>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
              <GraduationCap className="mr-2" />
              Educational Pathways
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {result?.collegeSuggestion?.map((college, index) => (
                <Card key={index} className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">{college.degreeName}</CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">{college.collegeName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {college.location} • {college.degreeDuration}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{college.degreeDescription}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
              <BookOpen className="mr-2" />
              Recommended Courses
            </h2>
            <div className="space-y-4">
              {result?.courseSuggestion?.map((course, index) => (
                <Card key={index} className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">{course.courseName}</CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">{course.courseDuration}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{course.courseDescription}</p>
                    <Button
                      variant="link"
                      className="text-emerald-600 dark:text-emerald-400 p-0 hover:text-emerald-700 dark:hover:text-emerald-300"
                      asChild
                    >
                      <Link href={course.courseLink} target="_blank" rel="noopener noreferrer">
                        Learn More <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
              <Brain className="mr-2" />
              Your Key Attributes
            </h2>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 shadow-lg">
              {result?.careerPath?.keypoints.map((keypoint, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{keypoint.attribute}</h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-1">{keypoint.value}</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{keypoint.description}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm italic">{keypoint.industryValue}</p>
                  {index < result.careerPath.keypoints.length - 1 && <Separator className="mt-4 bg-gray-300 dark:bg-gray-700" />}
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="max-w-5xl mx-auto mt-12 text-center">
          <Button className="bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors">
            Explore More Career Options
          </Button>
        </footer>
      </div>
    </div>
  )
}