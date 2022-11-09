import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import questions from '../db/en';
const Tab1: React.FC = () => {
    let baseQuestions = questions.normal.map(x=>x);

    const cardCount = 5;

    const onCardClick = ()=>{
        const ul = document.querySelector('ul.card-list');

        const prependList = function() {
            const lastChild = document.querySelector('.card:last-child');
            if(ul &&lastChild&& lastChild.classList.contains('activeNow') ) {
                const newElementArray = [];
                const cards = document.querySelectorAll('.card');
                for(let i = cardCount-1; i < cards.length; i++) {
                    cards[i].classList.remove('transformThis');
                    cards[i].classList.remove('activeNow');
                    newElementArray.push(cards[i]);
                }
                newElementArray.forEach(newElement=>{
                    ul.insertBefore(newElement, ul.childNodes[0]);
                });
            }
        }
        const lastLi = document.querySelector('li:last-child');
        if(lastLi) {
            lastLi.classList.remove('transformPrev');
            lastLi.classList.add('transformThis');
            if (lastLi.previousElementSibling){
                lastLi.previousElementSibling.classList.add('activeNow');
                const content = lastLi.previousElementSibling.querySelector('div:last-child');
                if (content) {
                    if (!baseQuestions.length) {
                        baseQuestions = questions.normal.map(x=>x);
                    }
                    content.innerHTML = baseQuestions.shift() || "";
                }

            }
            setTimeout(function(){prependList(); }, 150);
        }
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Never Have I Ever...</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={"home-background"}>
          <div className="card-container">
              <div className="card-stack">

                  <ul className="card-list" onClick={onCardClick}>
                      {
                          new Array(cardCount).fill(1).map((item, index) =>
                              <li key={index} className={"card " + (index === cardCount-1 ? "activeNow" : "")}>
                                  <div className={'title'}>Never Have I Ever...</div>
                                  <div>{baseQuestions.shift()}</div>
                              </li>
                          )
                      }
                  </ul>
              </div>
          </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
