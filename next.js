import { useEffect, useState } from 'react';

export default function Templates() {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/templates')
            .then(response => response.json())
            .then(data => setTemplates(data))
            .catch(error => console.error("Error fetching templates:", error));
    }, []);

    return (
        <div>
            <h1>HR Letter Templates</h1>
            <ul>
                {templates.map(template => (
                    <li key={template.id}>{template.title}</li>
                ))}
            </ul>
        </div>
    );
}
