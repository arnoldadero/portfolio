// src/components/ProjectCard.tsx
import { Box, Image, Heading, Text, Link, HStack } from '@chakra-ui/react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Project } from '../types/project';
import React from 'react';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <Box
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            shadow="md"
        >
            <Image src={project.imageUrl} alt={project.title} />
            <Box p="6">
                <Heading size="md" mb={2}>{project.title}</Heading>
                <Text mb={4}>{project.description}</Text>
                <Text fontSize="sm" color="gray.600" mb={4}>
                    {project.techStack}
                </Text>
                <HStack gap={4}>
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </Link>
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt />
                    </Link>
                </HStack>
            </Box>
        </Box>
    );
};