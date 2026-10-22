import React from 'react';

const FAQ: string[] = [
	'И?',
	'А если подумать?',
	'Хммм..',
	'Ты уверен?',
	'А потом?',
	'Так, а суть вопроса в чем?',
	'Подумай хорошо!',
];

interface IvanState {
	questionArr: string | null;
	answerArr: string | null;
	loading: boolean;
	time: string | null;
	index: number;
}

type IvanProps = Record<string, never>;

export class Ivan extends React.Component<IvanProps, IvanState> {
	textRef: React.RefObject<HTMLTextAreaElement | null>;
	loadingTimer: ReturnType<typeof setTimeout> | null = null;
	clearTimer: ReturnType<typeof setTimeout> | null = null;

	constructor(props: IvanProps) {
		super(props);
		this.textRef = React.createRef();
		this.question = this.question.bind(this);
		this.clearChat = this.clearChat.bind(this);
		this.state = {
			questionArr: null,
			answerArr: null,
			loading: false,
			time: null,
			index: this.randomAnswer(0, FAQ.length - 1)
		}
	}

	question(){
		const textarea = this.textRef.current;
		if (!textarea || !textarea.value) {
			return;
		}
		// Отменяем таймеры предыдущего вопроса, чтобы запоздалый clearChat
		// не стёр новый вопрос-ответ при быстрых повторных кликах
		if (this.loadingTimer) clearTimeout(this.loadingTimer);
		if (this.clearTimer) clearTimeout(this.clearTimer);
		const index = this.state.index;
		const text = FAQ[index];
		this.setState({
			questionArr: textarea.value,
			answerArr: text,
			loading: true,
			time: this.formatTime(),
			index: (index + 1) % FAQ.length
		});
		textarea.value = '';
		this.loadingTimer = setTimeout(() => {
			this.setState({
				loading: false,
			});
			this.clearTimer = setTimeout(this.clearChat, 5000);
		}, 1000);
	}

	clearChat(){
		this.setState({
			questionArr: null,
			answerArr: null,
			time: null
		});
	}

	randomAnswer(min: number, max: number){
		return Math.floor(Math.random() * (max - min) + min);
	}

	formatTime(){
		return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
	}

	render() {
		let { questionArr, answerArr, loading, time } = this.state;
		let avatarSrc = (answerArr && !loading) ? './img/2.jpg' : './img/1.jpg';

		let messages;
		if (!questionArr && !answerArr) {
			messages = (
				<div className="msg msg-in">
					<div className="msg-avatar"><img src="./img/1.jpg" alt="Иван" /></div>
					<div className="msg-bubble">Ну давай же сюда свой вопрос!</div>
				</div>
			);
		} else {
			messages = (
				<React.Fragment>
					<div className="msg msg-out">
						<div className="msg-bubble">
							{questionArr}
							<span className="msg-time">{time}</span>
						</div>
					</div>
					<div className="msg msg-in">
						<div className="msg-avatar"><img src={avatarSrc} alt="Иван" /></div>
						<div className="msg-bubble">
							{loading ? <span className="typing"><i></i><i></i><i></i></span> : answerArr}
							{!loading && <span className="msg-time">{time}</span>}
						</div>
					</div>
				</React.Fragment>
			);
		}

		return(
			<div className="chat">
				<div className="chat-header">
					<div className="chat-header-info">
						<div className="chat-header-name">Спроси Ваню!</div>
						<div className="chat-header-status">{loading ? 'печатает…' : 'онлайн (только для тебя)'}</div>
					</div>
				</div>
				<div className="chat-body">
					{messages}
				</div>
				<div className="chat-footer">
					<textarea
						className="chat-input"
						placeholder="Напишите сообщение…"
						rows={1}
						defaultValue=""
						ref={this.textRef}
						onKeyDown={(e) => {
							if (e.key === 'Enter' && !e.shiftKey) {
								e.preventDefault();
								this.question();
							}
						}}
					></textarea>
					<button type="submit" className="chat-send" onClick={this.question} aria-label="Отправить">
						<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
							<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
						</svg>
					</button>
				</div>
			</div>
		)
	}
};
