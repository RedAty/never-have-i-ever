import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import questions from '../db/questions';
import localeStrings from "../db/localeStrings";

interface LocaleProps {
    locale: string,
}

/**
 * @name shuffle
 * @desc Fisher-Yates (aka Knuth) Shuffle.
 * @param array
 */
function shuffle(array: string[]) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const Tab1: React.FC<LocaleProps>  = (props:any) => {
    console.error('Prop: ', props);
    // @ts-ignore
    const locales = localeStrings[props.locale] || localeStrings.en;
    /**
     *
     * @param locale
     * @return array
     */
    const getBaseQuestions = (locale:string) => {
        // @ts-ignore
        const qs = (questions[locale] || questions.en);

        if (Array.isArray(qs)) {
            return shuffle(qs.map(x=>x));
        }
        return [];
    }
    let baseQuestions = getBaseQuestions(props.locale),
        clickIsRunning = false,
        ul: Element | null;

    const cardCount = 5;

    const onCardClick = () => {
        if (clickIsRunning) {
            return;
        }
        clickIsRunning = true;
        if (!ul) {
            ul = document.querySelector('ul.card-list');
        }

        const prependList = () => {
            if (ul) {
                const lastChild = ul.querySelector('.card:last-child');
                if (lastChild && lastChild.classList.contains('activeNow')) {
                    const newElementArray = [];
                    const cards = ul.querySelectorAll('.card');

                    for (let i = cardCount-1; i < cards.length; i++) {
                        cards[i].classList.remove('transformThis');
                        cards[i].classList.remove('activeNow');
                        newElementArray.push(cards[i]);
                    }

                    newElementArray.forEach(newElement => {
                        if (ul) {
                            ul.insertBefore(newElement, ul.childNodes[0]);
                        }
                    });
                }
            }
        }
        if (ul) {
            const lastLi = ul.querySelector('li:last-child');
            if (lastLi) {
                lastLi.classList.remove('transformPrev');
                lastLi.classList.add('transformThis');
                if (lastLi.previousElementSibling) {
                    lastLi.previousElementSibling.classList.add('activeNow');
                    const content = lastLi.previousElementSibling.querySelector('div:last-child');
                    if (content) {
                        if (!baseQuestions.length) {
                            baseQuestions = getBaseQuestions(props.locale);
                            console.error(baseQuestions);
                            console.error(questions);
                        }
                        content.innerHTML = baseQuestions.shift() || "";
                    }

                }
                setTimeout(() => {
                    prependList();
                    clickIsRunning = false;
                }, 150);
            }
        }
    };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{locales.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={"home-background"}>
          <div className="card-container">
              <div className="card-stack">

                  <ul className="card-list" onClick={onCardClick}>
                      {
                          new Array(cardCount).fill(1).map((item, index) =>
                              <li key={index} className={"card " + (index === cardCount-1 ? "activeNow" : "")}>
                                  <div className={'title'}>{locales.cardTitle}</div>
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
