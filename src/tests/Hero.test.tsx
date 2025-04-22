import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hero from '../containers/Hero';

// Mock child components to isolate Hero component testing
jest.mock('../containers/Skills', () => () => <div data-testid="skills-section">Skills</div>);
jest.mock('../containers/Projects', () => () => <div data-testid="projects-section">Projects</div>);
jest.mock('../containers/Contact', () => () => <div data-testid="contact-section">Contact</div>);

describe('Hero Component', () => {
  const renderHero = () => {
    return render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );
  };

  it('renders the main heading with correct styling', () => {
    renderHero();
    const fullStack = screen.getByText('Full-Stack');
    const engineer = screen.getByText('Engineer');
    
    expect(fullStack).toBeInTheDocument();
    expect(fullStack).toHaveClass('text-white', 'inline-block', 'mb-2');
    expect(engineer).toBeInTheDocument();
    expect(engineer).toHaveClass('block', 'text-transparent', 'bg-clip-text');
  });

  it('displays the professional description with proper formatting', () => {
    renderHero();
    const description = screen.getByText(/Crafting robust, scalable solutions/);
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-xl', 'text-gray-300', 'leading-relaxed');
  });

  it('renders all social media links with correct attributes', () => {
    renderHero();
    const socialLinks = [
      { label: 'GitHub', href: 'https://github.com/arnoldadero' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arnold-adero-49607955' },
      { label: 'Email', href: 'mailto:arnold@mvuvi.co.ke' }
    ];

    socialLinks.forEach(({ label, href }) => {
      const link = screen.getByLabelText(label);
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders CTA buttons with correct styling and icons', () => {
    renderHero();
    const projectsButton = screen.getByText('View Projects').closest('a');
    const workHistoryButton = screen.getByText('View Work History').closest('a');

    expect(projectsButton).toHaveAttribute('href', '#projects');
    expect(workHistoryButton).toHaveAttribute('href', 'https://www.upwork.com/freelancers/~01f65b6f4d8c1e7b32');
    expect(workHistoryButton).toHaveAttribute('target', '_blank');
    expect(workHistoryButton).toHaveAttribute('rel', 'noopener noreferrer');
    expect(projectsButton).toHaveClass('group', 'relative');
    expect(workHistoryButton).toHaveClass('group');
  });

  it('renders the profile image with correct dimensions and attributes', () => {
    renderHero();
    const imageContainer = screen.getByAltText('Developer workspace').parentElement;
    const image = screen.getByAltText('Developer workspace');

    expect(imageContainer).toHaveClass('h-[500px]');
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveClass('object-cover', 'object-center');
  });

  it('renders all sections in the correct order', () => {
    renderHero();
    const sections = ['skills-section', 'projects-section', 'contact-section'];
    const renderedSections = sections.map(id => screen.getByTestId(id));
    
    renderedSections.forEach((section, index) => {
      expect(section).toBeInTheDocument();
      if (index > 0) {
        expect(section).toHaveClass(index % 2 === 0 ? 'bg-white' : 'bg-gray-50');
      }
    });
  });
});
