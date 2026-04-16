const username = "theniteshdev";


async function getProjects() {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await res.json();

    const container = document.getElementById("projects");
    container.innerHTML = "";

    const pagesProjects = repos.filter(repo => repo.has_pages);

    if (pagesProjects.length === 0) {
        container.innerHTML = "<p>No live projects yet</p>";
        return;
    }

    pagesProjects.forEach(repo => {
        const div = document.createElement("div");
        div.className = "project";
        const url = repo.name === `${username}.github.io`
            ? `https://${username}.github.io`
            : `https://${username}.github.io/${repo.name}`;

        div.innerHTML = `
        <strong>${repo.name}</strong><br>
        <small>${repo.description || "No description"}</small><br>
        <a href="${url}" target="_blank">Open →</a>
        `;

        container.appendChild(div);
    });
}

getProjects();