'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, BookOpen, User } from 'lucide-react'

interface Question {
  _id: string
  questionText: string
  type: string
  category: string
  explanation: string
  options: string[]
  parameter: string
  correctAnswer?: string
}

const SurveyForm: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [activeCategory, setActiveCategory] = useState<string>('survey')
  const [aptitudeScore, setAptitudeScore] = useState(0)

  const router = useRouter()

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL +'/question',{
          headers:{
            "Authorization": "Bearer " + localStorage.getItem("token"),
          }
        })
        const data = await response.json()
        setQuestions(data.data)
        setActiveCategory(data.data[0].category)
      } catch (error) {
        console.error("Error fetching questions:", error)
      }
    }

    fetchQuestions()
  }, [])

  const handleInputChange = (value: string) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questions[currentQuestion].parameter]: value,
    }))

    if (questions[currentQuestion].category === 'aptitude' && value === questions[currentQuestion].correctAnswer) {
      setAptitudeScore(prevScore => prevScore + 1)
    }
  }

  const goToNextQuestion = () => {
    const currentCategoryQuestions = questions.filter(q => q.category === activeCategory)
    const currentIndexInCategory = currentCategoryQuestions.findIndex(q => q._id === questions[currentQuestion]._id)
    
    if (currentIndexInCategory < currentCategoryQuestions.length - 1) {
      const nextQuestionIndex = questions.findIndex(q => q._id === currentCategoryQuestions[currentIndexInCategory + 1]._id)
      setCurrentQuestion(nextQuestionIndex)
    } else {
      const categoryIndex = categories.indexOf(activeCategory)
      if (categoryIndex < categories.length - 1) {
        const nextCategory = categories[categoryIndex + 1]
        setActiveCategory(nextCategory)
        const nextCategoryFirstQuestion = questions.find(q => q.category === nextCategory)
        if (nextCategoryFirstQuestion) {
          setCurrentQuestion(questions.findIndex(q => q._id === nextCategoryFirstQuestion._id))
        }
      }
    }
  }

  const goToPreviousQuestion = () => {
    const currentCategoryQuestions = questions.filter(q => q.category === activeCategory)
    const currentIndexInCategory = currentCategoryQuestions.findIndex(q => q._id === questions[currentQuestion]._id)
    
    if (currentIndexInCategory > 0) {
      const prevQuestionIndex = questions.findIndex(q => q._id === currentCategoryQuestions[currentIndexInCategory - 1]._id)
      setCurrentQuestion(prevQuestionIndex)
    } else {
      const categoryIndex = categories.indexOf(activeCategory)
      if (categoryIndex > 0) {
        const prevCategory = categories[categoryIndex - 1]
        setActiveCategory(prevCategory)
        const prevCategoryLastQuestion = questions.filter(q => q.category === prevCategory).pop()
        if (prevCategoryLastQuestion) {
          setCurrentQuestion(questions.findIndex(q => q._id === prevCategoryLastQuestion._id))
        }
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const request = await fetch(process.env.NEXT_PUBLIC_API_URL+'/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        userId: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') || '{}')._id : '',
        answer: {
          ...answers,
          aptitudeScore: aptitudeScore
        },
      }),
    });
    const response = await request.json();
    console.log(response);
    if(response.success){
      localStorage.setItem("answerId",response.data._id)
      router.push('/result');
    }
  }

  const getProgressPercentage = (category: string) => {
    const categoryQuestions = questions.filter(q => q.category === category)
    const answeredQuestions = categoryQuestions.filter(q => answers[q.parameter])
    return Math.round((answeredQuestions.length / categoryQuestions.length) * 100)
  }

  const getTotalProgress = () => {
    const answeredQuestions = questions.filter(q => answers[q.parameter])
    return Math.round((answeredQuestions.length / questions.length) * 100)
  }

  const categories = [...new Set(questions.map(q => q.category))]

  const categoryIcons: { [key: string]: React.ReactNode } = {
    survey: <BookOpen className="w-6 h-6" />,
    personality: <User className="w-6 h-6" />,
    aptitude: <Brain className="w-6 h-6" />,
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    const firstQuestionInCategory = questions.find(q => q.category === category)
    if (firstQuestionInCategory) {
      setCurrentQuestion(questions.findIndex(q => q._id === firstQuestionInCategory._id))
    }
  }

  const CircularProgress: React.FC<{ percentage: number, color: string, icon: React.ReactNode }> = ({ percentage, color, icon }) => (
    <div className="relative w-20 h-20">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        <circle
          className={`${color} stroke-current`}
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          strokeDasharray={`${percentage * 2.51}, 251.2`}
          transform="rotate(-90 50 50)"
        ></circle>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {icon}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-200">
      <Navbar />
      <div className="container mx-auto p-4 flex flex-col lg:flex-row items-start lg:items-start lg:space-x-8 pt-20">
        <Card className="w-full lg:w-3/4 mb-8 lg:mb-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Career Assessment Survey</CardTitle>
          </CardHeader>
          <CardContent>
            {questions.length > 0 ? (
              <form onSubmit={handleSubmit}>
                <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    {categories.map((category) => (
                      <TabsTrigger key={category} value={category} className="capitalize">
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {categories.map((category) => (
                    <TabsContent key={category} value={category}>
                      <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                          {questions[currentQuestion].questionText}
                        </h2>

                        <RadioGroup
                          value={answers[questions[currentQuestion].parameter] || ""}
                          onValueChange={handleInputChange}
                          className="space-y-2"
                        >
                          {questions[currentQuestion].options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={option}
                                id={`option-${index}`}
                                className="text-emerald-600 dark:text-emerald-400"
                              />
                              <Label htmlFor={`option-${index}`} className="text-gray-700 dark:text-gray-300 cursor-pointer">
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </motion.div>
                    </TabsContent>
                  ))}
                </Tabs>

                <div className="flex justify-between items-center mt-8">
                  <Button
                    type="button"
                    onClick={goToPreviousQuestion}
                    disabled={currentQuestion === 0}
                    variant="outline"
                    className="text-gray-900 dark:text-gray-200"
                  >
                    Previous
                  </Button>
                  <div className="text-gray-700 dark:text-gray-300 font-semibold">
                    Question {currentQuestion + 1} of {questions.length}
                  </div>
                  {currentQuestion === questions.length - 1 ? (
                    <Button
                      type="submit"
                      className="bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={goToNextQuestion}
                      className="bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                    >
                      Next
                    </Button>
                  )}
                </div>
              </form>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">Loading questions...</p>
            )}
          </CardContent>
        </Card>

        <Card className="w-full lg:w-1/4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-5rem)] overflow-y-auto">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Progress Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200 stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <circle
                    className="text-emerald-600 dark:text-emerald-400 stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray={`${getTotalProgress() * 2.51}, 251.2`}
                    transform="rotate(-90 50 50)"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{getTotalProgress()}%</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {categories.map((category) => (
                <div key={category} className="flex flex-col items-center space-y-2">
                  <CircularProgress
                    percentage={getProgressPercentage(category)}
                    color={category === 'survey' ? 'text-blue-500' : category === 'personality' ? 'text-purple-500' : 'text-orange-500'}
                    icon={categoryIcons[category]}
                  />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 capitalize">{category}</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{getProgressPercentage(category)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SurveyForm