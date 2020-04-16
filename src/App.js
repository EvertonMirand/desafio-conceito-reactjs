import React, { useState, useEffect } from 'react';

import './styles.css';
import api from './services/api';

function App() {
	const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		api.get('/repositories').then(({ data }) => {
			if (data) {
				setRepositories(data);
			}
		});
	}, []);
	async function handleAddRepository() {
		const { data } = await api.post('/repositories', {
			url: 'https://github.com/josepholiveira',
			title: 'Desafio ReactJS',
			techs: ['React', 'Node.js'],
		});

		setRepositories([...repositories, data]);
	}

	async function handleRemoveRepository(id) {
		const repository = repositories[id];
		api.delete(`/repositories/${repository.id}`).then((data) => {
			setRepositories(repositories.filter((repo) => repo.id !== repository.id));
		});
	}

	return (
		<div>
			<ul data-testid="repository-list">
				{repositories.map(({ title, id }, index) => (
					<li key={id}>
						{title}
						<button onClick={() => handleRemoveRepository(index)}>Remover</button>
					</li>
				))}
			</ul>

			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

export default App;
