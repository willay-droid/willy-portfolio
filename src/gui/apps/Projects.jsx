import { projects } from "../../data/links";

export default function Projects() {
  return (
    <div className="app-content project-list">
      {Object.values(projects).map((project) => (
        <article key={project.title}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <span>
            {project.status} · {project.stack}
          </span>
        </article>
      ))}
    </div>
  );
}
