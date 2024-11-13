'use client'

import './styles/globals.css'
import React from 'react'
import { useState, useEffect, createContext, useContext } from 'react'
import { Moon, Sun, Github, Linkedin, Mail, Menu, X } from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components//ui/dialog'
import { Progress } from './components//ui/progress'
import axios from 'axios';

// Create theme context
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

// Create theme provider component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Define Project type
type Project = {
  title: string;
  description: string;
  link: string;
  skills: string[];
};

// Define the api instance
const api = axios.create({
  baseURL: '/api', // Changed from 'https://api.example.com'
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add default projects and skills
const defaultProjects: Project[] = [
  {
    title: "Portfolio Website",
    description: "A personal portfolio website built with React and Go",
    link: "https://github.com/yourusername/portfolio",
    skills: ["React", "Go", "TypeScript"]
  }
];

const defaultSkills: Skill[] = [
  {
    name: "React",
    logo: "/logos/react.svg",
    projects: []
  }
];

// Update the Skill type to include projects
type Skill = {
  name: string;
  logo: string;
  projects: Array<{ name: string; url: string; }>;
};

export function Portfolio() {
  // Replace useTheme with useContext
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [skills, setSkills] = useState<Skill[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/protected/projects');
        setProjects(response.data);
        
        const uniqueSkills = Array.from(new Set(
          response.data.flatMap((project: Project) => project.skills)
        )).map((skillName: unknown) => ({
          name: skillName as string,
          logo: `/logos/${(skillName as string).toLowerCase()}.svg`,
          projects: response.data.filter((p: Project) => p.skills.includes(skillName as string))
        }));
        
        setSkills(uniqueSkills);
        setSkills(uniqueSkills);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Set some default data in case of error
        setSkills(defaultSkills);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateSkillPercentage = (skillName: string) => {
    const projectsUsingSkill = projects.filter(project => project.skills.includes(skillName))
    return (projectsUsingSkill.length / projects.length) * 100
  }

  if (!mounted || loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">John Doe</h1>
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Home
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Skills
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Projects
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleTheme()}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleTheme()}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-b">
            <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
                  setMobileMenuOpen(false)
                }}
              >
                Home
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
                  setMobileMenuOpen(false)
                }}
              >
                Skills
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                  setMobileMenuOpen(false)
                }}
              >
                Projects
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  setMobileMenuOpen(false)
                }}
              >
                Contact
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-8">
        <section id="home" className="py-20">
          <h2 className="text-4xl font-bold mb-4">Hello, I'm John Doe</h2>
          <p className="text-xl mb-8">A passionate full-stack developer with a love for creating efficient, scalable, and user-friendly web applications.</p>
          <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Get in touch</Button>
        </section>

        <section id="skills" className="py-20">
          <h2 className="text-3xl font-bold mb-8">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center h-40 p-4">
                      <img src={skill.logo} alt={skill.name} width="64" height="64" className="mb-4" />
                      <p className="text-lg font-semibold text-center">{skill.name}</p>
                      <Progress value={calculateSkillPercentage(skill.name)} className="w-full mt-2" />
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{skill.name} Projects</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    {skill.projects.map((project, index) => (
                      <a
                        key={index}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2 hover:bg-accent rounded-md transition-colors duration-200"
                      >
                        {project.name}
                      </a>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </section>

        <section id="projects" className="py-20">
          <h2 className="text-3xl font-bold mb-8">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{project.description}</CardDescription>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section id="contact" className="py-20">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <Tabs defaultValue="email" className="w-full max-w-md mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="github">GitHub</TabsTrigger>
              <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full">
                  <a href="mailto:john.doe@example.com" className="flex items-center justify-center">
                    <Mail className="mr-2 h-4 w-4" /> john.doe@example.com
                  </a>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="github">
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full">
                  <a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <Github className="mr-2 h-4 w-4" /> GitHub Profile
                  </a>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="linkedin">
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full">
                  <a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <Linkedin className="mr-2 h-4 w-4" /> LinkedIn Profile
                  </a>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <footer className="bg-muted py-4 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 John Doe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

// Make ThemeProvider available for import
export { ThemeProvider }

