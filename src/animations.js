import Radium, {StyleRoot} from 'radium';
import { fadeIn, bounce, bouceOut, bounceIn, rollIn, rubberBand, tada, hinge, jello, flash, flipInX, rotateInDownRight, swing, wobble ,pulse } from 'react-animations';


export const animations = [
    {
        animation: '1s',
        animationName: Radium.keyframes(bounce, 'bounce'),
    },
    {
        animation: '1s',
        animationName: Radium.keyframes(flash, 'flash'),
    },
    {
        animation: '1s',
        animationName: Radium.keyframes(jello, 'jello'),
    },
    {
        animation: '1s',
        animationName: Radium.keyframes(rubberBand, 'rubberBand'),
    },
    {
        animation: '1s',
        animationName: Radium.keyframes(tada, 'tada'),
    },
    {
        animation: '1s',
        animationName: Radium.keyframes(rotateInDownRight, 'rotateInDownRight'),
    },
    {
        animation: '1s',
        animationName: Radium.keyframes(wobble, 'wobble'),
    },
    {
        animation: '1s',
        animationName: Radium.keyframes(pulse, 'pulse'),
    },
    {
        animation: '1s',
        animationName: Radium.keyframes(flipInX, 'flipInX'),
    },
    {
        animation: '1s',
        animationName: Radium.keyframes(rollIn, 'rollIn'),
    }
];

export const getRandomAnimation = () => {
    var max = animations.length;
    var rand =  Math.floor(Math.random() * Math.floor(max));
    return animations[rand];
}