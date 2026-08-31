import { useEffect, useState } from 'react';
import EventForm from '../components/admin/EventForm';
import EventCard from '../components/buyer/EventCard';
import TicketCard from '../components/buyer/TicketCard';
import { listarMeusIngressosAPI, listarEventosAPI } from '../services/api';

export default function Dashboard() {
    const [eventos, setEventos] = useState([]);
    const [meusIngressos, setMeusIngressos] = useState([]);
    const [feedback, setFeedback] = useState(null);

    const carregarDados = async () => {
        try {
            const [dadosIngressos, dadosEventos] = await Promise.all([
                listarMeusIngressosAPI(),
                listarEventosAPI()
            ]);
            setMeusIngressos(dadosIngressos);
            setEventos(dadosEventos);
            setFeedback(null);
        } catch (error) {
            setFeedback({ tipo: 'erro', msg: error.mensagem || "Erro ao carregar dados." });
        }
    };

    useEffect(() => {
        carregarDados();
    }, []);

    const handleEventoCriado = (novoEvento) => {
        setEventos(prev => [novoEvento, ...prev]);
    };

    const sectionStyle = { backgroundColor: '#1e1e1e', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' };
    const feedbackStyle = { padding: '1rem', backgroundColor: '#f44336', color: 'white', borderRadius: '4px', marginBottom: '1rem' };

    return (
        <div>
            {feedback && <div style={feedbackStyle}>{feedback.msg}</div>}

            <section style={sectionStyle}>
                <h2>Administração: Cadastrar Evento</h2>
                <EventForm onEventoCriado={handleEventoCriado} />
            </section>

            <section style={sectionStyle}>
                <h2>Eventos Disponíveis</h2>
                <div className="grid-container">
                    {eventos.map(ev => (
                        <EventCard key={ev.id} evento={ev} onCompraSucesso={carregarDados} />
                    ))}
                </div>
            </section>

            <section style={sectionStyle}>
                <h2>Meus Ingressos</h2>
                <div className="grid-container">
                    {meusIngressos.map(ing => (
                        <TicketCard key={ing.id} ingresso={ing} onCancelamentoSucesso={carregarDados} />
                    ))}
                </div>
            </section>
        </div>
    );
}