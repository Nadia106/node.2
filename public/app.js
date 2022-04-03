document.addEventListener("click", event => {
    if(event.target.dataset.type === "remove") {
        const id = event.target.dataset.id
        remove(id).then(() => {
            event.target.closest("li").remove()
        })
    } else if(event.target.dataset.type === "change") {
        const id = event.target.dataset.id
        const title = event.target.dataset.title
        const updateedTitle = prompt("new title", title)
        if(updateedTitle  !== null) {
            update({id, title: updateedTitle}).then(() => {
                event.target.closest("li").querySelector("span").innerText = updateedTitle
            })
        }
    }
})

async function remove(id) {
    await fetch(`/${id}`, {
        method: "DELETE"
    })
}

async function update(newTitle) {
    await fetch(`/${newTitle}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(newTitle)
    })
}