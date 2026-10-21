import React from 'react';

const FAQ = [
	'И?',
	'А если подумать?',
	'Хммм..',
	'Ты уверен?',
	'А потом?',
	'Так, а суть вопроса в чем?',
	'Подумай хорошо!',
];

export class Ivan extends React.Component {
	constructor(props) {
		super(props);
		this.textRef = React.createRef();
		this.loadingTimer = null;
		this.clearTimer = null;
		this.question = this.question.bind(this);
		this.clearChat = this.clearChat.bind(this);
		this.state = {
			questionArr: null,
			answerArr: null,
			loading: false,
			index: this.randomAnswer(0, FAQ.length - 1)
		}
	}

	question(){
		if (!this.textRef.current.value) {
			return;
		}
		// Отменяем таймеры предыдущего вопроса, чтобы запоздалый clearChat
		// не стёр новый вопрос-ответ при быстрых повторных кликах
		clearTimeout(this.loadingTimer);
		clearTimeout(this.clearTimer);
		const index = this.state.index;
		var text = FAQ[index];
		this.setState({
			questionArr: this.textRef.current.value,
			answerArr: text,
			loading: true,
			index: (index + 1) % FAQ.length
		});
		this.textRef.current.value = '';
		this.loadingTimer = setTimeout(() => {
			this.setState({
				loading: false,
			});
			this.clearTimer = setTimeout(this.clearChat, 3000);
		}, 1000);
	}

	clearChat(){
		this.setState({
			questionArr: null,
			answerArr: null
		});
	}

	randomAnswer(min, max){
		return Math.floor(Math.random() * (max - min) + min);
	}

	render() {
		let image = (this.state.answerArr && !this.state.loading) ? <img src="./img/2.jpg" /> : <img src="./img/1.jpg" />;
		let answer = (this.state.answerArr && !this.state.loading) ? this.state.answerArr : <div className="loading"></div>;
		let chat = <div className="chat-window">
								<div className="question">
									<p>{this.state.questionArr}</p>
								</div>
								<div className="answer">{answer}</div>
							</div>;
		chat = (!this.state.questionArr && !this.state.answerArr) ? <div className="chat-window"><p>Ну давай же сюда свой вопрос!</p></div> : chat;
		let textarea = 	<div className="chat-textarea">
											<textarea className="form-control" defaultValue="" placeholder="Место для глупого вопроса" ref={this.textRef} rows="10"></textarea>
											<button type="submit" className="btn btn-success pull-right" onClick={this.question}>Задать вопрос</button>
											<div className="clearfix"></div>
										</div>;
		textarea = (!this.state.answerArr) ? textarea : '';

		return(
			<div className="chat">
				<div className="photo">{image}</div>
	    	{chat}
	    	{textarea}
			</div>
		)
	}
};
