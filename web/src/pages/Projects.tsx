// src/pages/Projects.tsx
import React from 'react';
import { useEffect, useState } from 'react';
import { SimpleGrid, Container, Heading } from '@chakra-ui/react';
import { ProjectCard } from '../components/ProjectCard';
import { getProjects } from '../api/projects';
import { Project } from '../types/project';

export const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await getProjects();
            setProjects(data);
        };
        fetchProjects();
    }, []);

    return (
        <Container maxW="container.xl" py={8}>
            <Heading mb={8}>My Projects</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </SimpleGrid>
        </Container>
    );
};