import { AgeGroup } from '../types/learning';

export interface AlphabetItem {
  letter: string;
  word: string;
  hindiWord: string;
  phonics: string;
  emoji: string;
  bgClass: string;
  borderClass: string;
}

export const ALPHABET_DATA: AlphabetItem[] = [
  { letter: 'A', word: 'Apple', hindiWord: 'सेब', phonics: 'A for Apple', emoji: '🍎', bgClass: 'bg-rose-50', borderClass: 'border-rose-300' },
  { letter: 'B', word: 'Ball', hindiWord: 'गेंद', phonics: 'B for Ball', emoji: '⚽', bgClass: 'bg-sky-50', borderClass: 'border-sky-300' },
  { letter: 'C', word: 'Cat', hindiWord: 'बिल्ली', phonics: 'C for Cat', emoji: '🐱', bgClass: 'bg-amber-50', borderClass: 'border-amber-300' },
  { letter: 'D', word: 'Dog', hindiWord: 'कुत्ता', phonics: 'D for Dog', emoji: '🐶', bgClass: 'bg-orange-50', borderClass: 'border-orange-300' },
  { letter: 'E', word: 'Elephant', hindiWord: 'हाथी', phonics: 'E for Elephant', emoji: '🐘', bgClass: 'bg-indigo-50', borderClass: 'border-indigo-300' },
  { letter: 'F', word: 'Fish', hindiWord: 'मछली', phonics: 'F for Fish', emoji: '🐠', bgClass: 'bg-cyan-50', borderClass: 'border-cyan-300' },
  { letter: 'G', word: 'Grapes', hindiWord: 'अंगूर', phonics: 'G for Grapes', emoji: '🍇', bgClass: 'bg-emerald-50', borderClass: 'border-emerald-300' },
  { letter: 'H', word: 'House', hindiWord: 'घर', phonics: 'H for House', emoji: '🏠', bgClass: 'bg-yellow-50', borderClass: 'border-yellow-300' },
  { letter: 'I', word: 'Ice Cream', hindiWord: 'आइसक्रीम', phonics: 'I for Ice Cream', emoji: '🍦', bgClass: 'bg-pink-50', borderClass: 'border-pink-300' },
  { letter: 'J', word: 'Jug', hindiWord: 'जग', phonics: 'J for Jug', emoji: '🏺', bgClass: 'bg-teal-50', borderClass: 'border-teal-300' },
  { letter: 'K', word: 'Kite', hindiWord: 'पतंग', phonics: 'K for Kite', emoji: '🪁', bgClass: 'bg-sky-50', borderClass: 'border-sky-300' },
  { letter: 'L', word: 'Lion', hindiWord: 'शेर', phonics: 'L for Lion', emoji: '🦁', bgClass: 'bg-amber-50', borderClass: 'border-amber-300' },
  { letter: 'M', word: 'Mango', hindiWord: 'आम', phonics: 'M for Mango', emoji: '🥭', bgClass: 'bg-yellow-50', borderClass: 'border-yellow-300' },
  { letter: 'N', word: 'Nest', hindiWord: 'घोंसला', phonics: 'N for Nest', emoji: '🪺', bgClass: 'bg-lime-50', borderClass: 'border-lime-300' },
  { letter: 'O', word: 'Orange', hindiWord: 'संतरा', phonics: 'O for Orange', emoji: '🍊', bgClass: 'bg-orange-50', borderClass: 'border-orange-300' },
  { letter: 'P', word: 'Parrot', hindiWord: 'तोता', phonics: 'P for Parrot', emoji: '🦜', bgClass: 'bg-emerald-50', borderClass: 'border-emerald-300' },
  { letter: 'Q', word: 'Queen', hindiWord: 'रानी', phonics: 'Q for Queen', emoji: '👑', bgClass: 'bg-amber-50', borderClass: 'border-amber-300' },
  { letter: 'R', word: 'Rabbit', hindiWord: 'खरगोश', phonics: 'R for Rabbit', emoji: '🐰', bgClass: 'bg-rose-50', borderClass: 'border-rose-300' },
  { letter: 'S', word: 'Sun', hindiWord: 'सूरज', phonics: 'S for Sun', emoji: '☀️', bgClass: 'bg-yellow-50', borderClass: 'border-yellow-300' },
  { letter: 'T', word: 'Tiger', hindiWord: 'बाघ', phonics: 'T for Tiger', emoji: '🐯', bgClass: 'bg-orange-50', borderClass: 'border-orange-300' },
  { letter: 'U', word: 'Umbrella', hindiWord: 'छाता', phonics: 'U for Umbrella', emoji: '☂️', bgClass: 'bg-sky-50', borderClass: 'border-sky-300' },
  { letter: 'V', word: 'Van', hindiWord: 'गाड़ी', phonics: 'V for Van', emoji: '🚐', bgClass: 'bg-teal-50', borderClass: 'border-teal-300' },
  { letter: 'W', word: 'Watch', hindiWord: 'घड़ी', phonics: 'W for Watch', emoji: '⌚', bgClass: 'bg-indigo-50', borderClass: 'border-indigo-300' },
  { letter: 'X', word: 'Xylophone', hindiWord: 'जलतरंग', phonics: 'X for Xylophone', emoji: '🎹', bgClass: 'bg-cyan-50', borderClass: 'border-cyan-300' },
  { letter: 'Y', word: 'Yak', hindiWord: 'याक', phonics: 'Y for Yak', emoji: '🐃', bgClass: 'bg-amber-50', borderClass: 'border-amber-300' },
  { letter: 'Z', word: 'Zebra', hindiWord: 'ज़ेबरा', phonics: 'Z for Zebra', emoji: '🦓', bgClass: 'bg-slate-100', borderClass: 'border-slate-300' },
];

export interface HindiLetterItem {
  char: string;
  translit: string;
  word: string;
  wordMeaning: string;
  emoji: string;
  type: 'swar' | 'vyanjan';
}

export const HINDI_SWAR: HindiLetterItem[] = [
  { char: 'अ', translit: 'a', word: 'अनार', wordMeaning: 'Pomegranate', emoji: '🍎', type: 'swar' },
  { char: 'आ', translit: 'aa', word: 'आम', wordMeaning: 'Mango', emoji: '🥭', type: 'swar' },
  { char: 'इ', translit: 'i', word: 'इमली', wordMeaning: 'Tamarind', emoji: '🌿', type: 'swar' },
  { char: 'ई', translit: 'ee', word: 'ईख', wordMeaning: 'Sugarcane', emoji: '🎋', type: 'swar' },
  { char: 'उ', translit: 'u', word: 'उल्लू', wordMeaning: 'Owl', emoji: '🦉', type: 'swar' },
  { char: 'ऊ', translit: 'oo', word: 'ऊन', wordMeaning: 'Wool', emoji: '🧶', type: 'swar' },
  { char: 'ऋ', translit: 'ri', word: 'ऋषि', wordMeaning: 'Sage', emoji: '🧘', type: 'swar' },
  { char: 'ए', translit: 'e', word: 'एड़ी', wordMeaning: 'Heel', emoji: '🦶', type: 'swar' },
  { char: 'ऐ', translit: 'ai', word: 'ऐनक', wordMeaning: 'Spectacles', emoji: '👓', type: 'swar' },
  { char: 'ओ', translit: 'o', word: 'ओखली', wordMeaning: 'Mortar', emoji: '🥣', type: 'swar' },
  { char: 'औ', translit: 'au', word: 'औरत', wordMeaning: 'Woman', emoji: '👩', type: 'swar' },
  { char: 'अं', translit: 'am', word: 'अंगूर', wordMeaning: 'Grapes', emoji: '🍇', type: 'swar' },
  { char: 'अः', translit: 'aha', word: 'प्रातः', wordMeaning: 'Morning', emoji: '🌅', type: 'swar' },
];

export const HINDI_VYANJAN: HindiLetterItem[] = [
  { char: 'क', translit: 'ka', word: 'कबूतर', wordMeaning: 'Pigeon', emoji: '🕊️', type: 'vyanjan' },
  { char: 'ख', translit: 'kha', word: 'खरगोश', wordMeaning: 'Rabbit', emoji: '🐰', type: 'vyanjan' },
  { char: 'ग', translit: 'ga', word: 'गमला', wordMeaning: 'Flowerpot', emoji: '🪴', type: 'vyanjan' },
  { char: 'घ', translit: 'gha', word: 'घर', wordMeaning: 'House', emoji: '🏠', type: 'vyanjan' },
  { char: 'ङ', translit: 'nga', word: 'गंगा', wordMeaning: 'River', emoji: '🌊', type: 'vyanjan' },
  { char: 'च', translit: 'cha', word: 'चम्मच', wordMeaning: 'Spoon', emoji: '🥄', type: 'vyanjan' },
  { char: 'छ', translit: 'chha', word: 'छाता', wordMeaning: 'Umbrella', emoji: '☂️', type: 'vyanjan' },
  { char: 'ज', translit: 'ja', word: 'जहाज़', wordMeaning: 'Ship', emoji: '🚢', type: 'vyanjan' },
  { char: 'झ', translit: 'jha', word: 'झंडा', wordMeaning: 'Flag', emoji: '🚩', type: 'vyanjan' },
  { char: 'ञ', translit: 'nya', word: 'पंख', wordMeaning: 'Feather', emoji: '🪶', type: 'vyanjan' },
  { char: 'ट', translit: 'ta', word: 'टमाटर', wordMeaning: 'Tomato', emoji: '🍅', type: 'vyanjan' },
  { char: 'ठ', translit: 'tha', word: 'ठेला', wordMeaning: 'Cart', emoji: '🛒', type: 'vyanjan' },
  { char: 'ड', translit: 'da', word: 'डमरू', wordMeaning: 'Drum', emoji: '🥁', type: 'vyanjan' },
  { char: 'ढ', translit: 'dha', word: 'ढोल', wordMeaning: 'Dhol', emoji: '🪘', type: 'vyanjan' },
  { char: 'ण', translit: 'na', word: 'बाण', wordMeaning: 'Arrow', emoji: '🏹', type: 'vyanjan' },
  { char: 'त', translit: 'ta', word: 'तरबूज', wordMeaning: 'Watermelon', emoji: '🍉', type: 'vyanjan' },
  { char: 'थ', translit: 'tha', word: 'थैला', wordMeaning: 'Bag', emoji: '👜', type: 'vyanjan' },
  { char: 'द', translit: 'da', word: 'दवात', wordMeaning: 'Inkpot', emoji: '🖋️', type: 'vyanjan' },
  { char: 'ध', translit: 'dha', word: 'धनुष', wordMeaning: 'Bow', emoji: '🏹', type: 'vyanjan' },
  { char: 'न', translit: 'na', word: 'नल', wordMeaning: 'Tap', emoji: '🚰', type: 'vyanjan' },
  { char: 'प', translit: 'pa', word: 'पतंग', wordMeaning: 'Kite', emoji: '🪁', type: 'vyanjan' },
  { char: 'फ', translit: 'pha', word: 'फल', wordMeaning: 'Fruit', emoji: '🍓', type: 'vyanjan' },
  { char: 'ब', translit: 'ba', word: 'बत्तख', wordMeaning: 'Duck', emoji: '🦆', type: 'vyanjan' },
  { char: 'भ', translit: 'bha', word: 'भालू', wordMeaning: 'Bear', emoji: '🐻', type: 'vyanjan' },
  { char: 'म', translit: 'ma', word: 'मछली', wordMeaning: 'Fish', emoji: '🐠', type: 'vyanjan' },
  { char: 'य', translit: 'ya', word: 'याक', wordMeaning: 'Yak', emoji: '🐃', type: 'vyanjan' },
  { char: 'र', translit: 'ra', word: 'रथ', wordMeaning: 'Chariot', emoji: '🛞', type: 'vyanjan' },
  { char: 'ल', translit: 'la', word: 'लट्टू', wordMeaning: 'Spinning Top', emoji: '🪀', type: 'vyanjan' },
  { char: 'व', translit: 'va', word: 'वन', wordMeaning: 'Forest', emoji: '🌳', type: 'vyanjan' },
  { char: 'श', translit: 'sha', word: 'शेर', wordMeaning: 'Lion', emoji: '🦁', type: 'vyanjan' },
  { char: 'ष', translit: 'sha', word: 'षट्कोण', wordMeaning: 'Hexagon', emoji: '🛑', type: 'vyanjan' },
  { char: 'स', translit: 'sa', word: 'सेब', wordMeaning: 'Apple', emoji: '🍎', type: 'vyanjan' },
  { char: 'ह', translit: 'ha', word: 'हाथी', wordMeaning: 'Elephant', emoji: '🐘', type: 'vyanjan' },
  { char: 'क्ष', translit: 'ksha', word: 'क्षत्रिय', wordMeaning: 'Warrior', emoji: '🛡️', type: 'vyanjan' },
  { char: 'त्र', translit: 'tra', word: 'त्रिशूल', wordMeaning: 'Trident', emoji: '🔱', type: 'vyanjan' },
  { char: 'ज्ञ', translit: 'gya', word: 'ज्ञानी', wordMeaning: 'Scholar', emoji: '📚', type: 'vyanjan' },
];

const EN_ONES = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen',
];
const EN_TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

export function getEnglishNumberWord(n: number): string {
  if (n === 100) return 'One Hundred';
  if (n < 20) return EN_ONES[n];
  const ten = Math.floor(n / 10);
  const one = n % 10;
  return one === 0 ? EN_TENS[ten] : `${EN_TENS[ten]} ${EN_ONES[one]}`;
}

export const HINDI_NUMBERS_1_TO_100: string[] = [
  'एक', 'दो', 'तीन', 'चार', 'पाँच', 'छह', 'सात', 'आठ', 'नौ', 'दस',
  'ग्यारह', 'बारह', 'तेरह', 'चौदह', 'पंद्रह', 'सोलह', 'सत्रह', 'अठारह', 'उन्नीस', 'बीस',
  'इक्कीस', 'बाईस', 'तेईस', 'चौबीस', 'पच्चीस', 'छब्बीस', 'सत्ताईस', 'अट्ठाईस', 'उनतीस', 'तीस',
  'इकतीस', 'बत्तीस', 'तैंतीस', 'चौंतीस', 'पैंतीस', 'छत्तीस', 'सैंतीस', 'अड़तीस', 'उनतालीस', 'चालीस',
  'इकतालीस', 'बयालीस', 'तैंतालीस', 'चवालीस', 'पैंतालीस', 'छियालीस', 'सैंतालीस', 'अड़तालीस', 'उनचास', 'पचास',
  'इक्यावन', 'बावन', 'तिरेपन', 'चौवन', 'पचपन', 'छप्पन', 'सत्तावन', 'अट्ठावन', 'उनसठ', 'साठ',
  'इकसठ', 'बासठ', 'तिरेसठ', 'चौंसठ', 'पैंसठ', 'छियासठ', 'सड़सठ', 'अड़सठ', 'उनहत्तर', 'सत्तर',
  'इकहत्तर', 'बहत्तर', 'तिहत्तर', 'चौहत्तर', 'पचहत्तर', 'छिहत्तर', 'सतहत्तर', 'अठहत्तर', 'उनासी', 'अस्सी',
  'इक्यासी', 'बयासी', 'तिरासी', 'चौरासी', 'पचासी', 'छियासी', 'सत्तासी', 'अट्ठासी', 'नवासी', 'नब्बे',
  'इक्यानवे', 'बानवे', 'तिरानवे', 'चौरानवे', 'पचानवे', 'छियानवे', 'सत्तानवे', 'अट्ठानवे', 'निन्यानवे', 'सौ',
];

export interface FoodItem {
  id: string;
  en: string;
  hi: string;
  emoji: string;
  factEn: string;
  factHi: string;
  category: 'fruit' | 'vegetable';
  cardBg: string;
}

export const FRUITS_VEG_DATA: FoodItem[] = [
  { id: 'apple', en: 'Apple', hi: 'सेब', emoji: '🍎', factEn: 'Crunchy red fruit that keeps you strong!', factHi: 'मीठा लाल फल जो सेहत बनाता है!', category: 'fruit', cardBg: 'bg-rose-50' },
  { id: 'mango', en: 'Mango', hi: 'आम', emoji: '🥭', factEn: 'The sweet golden king of summer fruits!', factHi: 'गर्मियों का मीठा फलों का राजा!', category: 'fruit', cardBg: 'bg-amber-50' },
  { id: 'banana', en: 'Banana', hi: 'केला', emoji: '🍌', factEn: 'Soft yellow fruit full of quick energy!', factHi: 'ऊर्जा से भरा पीला और मीठा फल!', category: 'fruit', cardBg: 'bg-yellow-50' },
  { id: 'grapes', en: 'Grapes', hi: 'अंगूर', emoji: '🍇', factEn: 'Tiny juicy berries that grow in bunches!', factHi: 'गुच्छों में उगने वाले रसीले अंगूर!', category: 'fruit', cardBg: 'bg-emerald-50' },
  { id: 'orange', en: 'Orange', hi: 'संतरा', emoji: '🍊', factEn: 'Juicy citrus fruit packed with Vitamin C!', factHi: 'विटामिन सी से भरपूर रसीला संतरा!', category: 'fruit', cardBg: 'bg-orange-50' },
  { id: 'watermelon', en: 'Watermelon', hi: 'तरबूज', emoji: '🍉', factEn: 'Big green fruit that is cool and watery inside!', factHi: 'बाहर से हरा, अंदर से मीठा लाल तरबूज!', category: 'fruit', cardBg: 'bg-rose-50' },
  { id: 'strawberry', en: 'Strawberry', hi: 'स्ट्रॉबेरी', emoji: '🍓', factEn: 'Heart-shaped sweet berry with tiny seeds!', factHi: 'छोटी और मीठी लाल बेरी!', category: 'fruit', cardBg: 'bg-pink-50' },
  { id: 'pineapple', en: 'Pineapple', hi: 'अनानास', emoji: '🍍', factEn: 'Tropical fruit wearing a leafy green crown!', factHi: 'हरे ताज वाला खट्टा-मीठा अनानास!', category: 'fruit', cardBg: 'bg-yellow-50' },
  { id: 'carrot', en: 'Carrot', hi: 'गाजर', emoji: '🥕', factEn: 'Crunchy orange root that helps your eyes shine!', factHi: 'आँखों की रोशनी बढ़ाने वाली गाजर!', category: 'vegetable', cardBg: 'bg-orange-50' },
  { id: 'tomato', en: 'Tomato', hi: 'टमाटर', emoji: '🍅', factEn: 'Juicy red kitchen favorite for soups and salads!', factHi: 'सब्जी और सलाद में काम आने वाला टमाटर!', category: 'vegetable', cardBg: 'bg-rose-50' },
  { id: 'potato', en: 'Potato', hi: 'आलू', emoji: '🥔', factEn: 'Grows underground and makes yummy mashed treats!', factHi: 'ज़मीन के नीचे उगने वाला सबका प्यारा आलू!', category: 'vegetable', cardBg: 'bg-amber-50' },
  { id: 'broccoli', en: 'Broccoli', hi: 'ब्रोकली', emoji: '🥦', factEn: 'Looks like a tiny green tree full of vitamins!', factHi: 'छोटे हरे पेड़ जैसी सेहतमंद ब्रोकली!', category: 'vegetable', cardBg: 'bg-emerald-50' },
  { id: 'corn', en: 'Corn', hi: 'मक्का', emoji: '🌽', factEn: 'Golden kernels tucked inside green leaves!', factHi: 'सुनहरे दानों वाला मीठा भुट्टा!', category: 'vegetable', cardBg: 'bg-yellow-50' },
  { id: 'peas', en: 'Green Peas', hi: 'मटर', emoji: '🫛', factEn: 'Little green pearls cozy inside a pod!', factHi: 'फली में बंद छोटे-छोटे हरे दाने!', category: 'vegetable', cardBg: 'bg-lime-50' },
  { id: 'eggplant', en: 'Brinjal', hi: 'बैंगन', emoji: '🍆', factEn: 'Shiny purple veggie with a green cap!', factHi: 'हरे ताज वाला चमकदार बैंगन!', category: 'vegetable', cardBg: 'bg-indigo-50' },
  { id: 'onion', en: 'Onion', hi: 'प्याज', emoji: '🧅', factEn: 'Has many crispy layers underneath its skin!', factHi: 'परतों से भरा गुणकारी प्याज!', category: 'vegetable', cardBg: 'bg-amber-50' },
];

export interface AnimalItem {
  id: string;
  en: string;
  hi: string;
  emoji: string;
  soundEn: string;
  soundHi: string;
  pitch: 'low' | 'mid' | 'chirp';
  category: 'animal' | 'bird';
}

export const ANIMALS_BIRDS_DATA: AnimalItem[] = [
  { id: 'lion', en: 'Lion', hi: 'शेर', emoji: '🦁', soundEn: 'Roar!', soundHi: 'दहाड़!', pitch: 'low', category: 'animal' },
  { id: 'elephant', en: 'Elephant', hi: 'हाथी', emoji: '🐘', soundEn: 'Pawoo!', soundHi: 'चिंघाड़!', pitch: 'low', category: 'animal' },
  { id: 'dog', en: 'Dog', hi: 'कुत्ता', emoji: '🐶', soundEn: 'Woof Woof!', soundHi: 'भौं-भौं!', pitch: 'mid', category: 'animal' },
  { id: 'cat', en: 'Cat', hi: 'बिल्ली', emoji: '🐱', soundEn: 'Meow!', soundHi: 'म्याऊँ!', pitch: 'mid', category: 'animal' },
  { id: 'cow', en: 'Cow', hi: 'गाय', emoji: '🐮', soundEn: 'Moo!', soundHi: 'माँ-माँ!', pitch: 'low', category: 'animal' },
  { id: 'monkey', en: 'Monkey', hi: 'बंदर', emoji: '🐒', soundEn: 'Ooh Ooh Aah!', soundHi: 'खो-खो!', pitch: 'mid', category: 'animal' },
  { id: 'frog', en: 'Frog', hi: 'मेंढक', emoji: '🐸', soundEn: 'Ribbit Ribbit!', soundHi: 'टर्र-टर्र!', pitch: 'mid', category: 'animal' },
  { id: 'sheep', en: 'Sheep', hi: 'भेड़', emoji: '🐑', soundEn: 'Baa Baa!', soundHi: 'में-में!', pitch: 'mid', category: 'animal' },
  { id: 'parrot', en: 'Parrot', hi: 'तोता', emoji: '🦜', soundEn: 'Squawk Hello!', soundHi: 'टें-टें!', pitch: 'chirp', category: 'bird' },
  { id: 'duck', en: 'Duck', hi: 'बत्तख', emoji: '🦆', soundEn: 'Quack Quack!', soundHi: 'क्वैक-क्वैक!', pitch: 'chirp', category: 'bird' },
  { id: 'owl', en: 'Owl', hi: 'उल्लू', emoji: '🦉', soundEn: 'Hoot Hoot!', soundHi: 'हू-हू!', pitch: 'mid', category: 'bird' },
  { id: 'peacock', en: 'Peacock', hi: 'मोर', emoji: '🦚', soundEn: 'May-awe!', soundHi: 'पीहू-पीहू!', pitch: 'chirp', category: 'bird' },
  { id: 'rooster', en: 'Rooster', hi: 'मुर्गा', emoji: '🐓', soundEn: 'Cock-a-doodle-doo!', soundHi: 'कुकड़ू-कूँ!', pitch: 'chirp', category: 'bird' },
  { id: 'sparrow', en: 'Sparrow', hi: 'गौरैया', emoji: '🐦', soundEn: 'Tweet Tweet!', soundHi: 'चीं-चीं!', pitch: 'chirp', category: 'bird' },
];

export interface ColorItem {
  id: string;
  en: string;
  hi: string;
  hex: string;
  textDark?: boolean;
  exampleEn: string;
  exampleHi: string;
  emoji: string;
}

export const COLORS_DATA: ColorItem[] = [
  { id: 'red', en: 'Red', hi: 'लाल', hex: '#EF4444', exampleEn: 'Apple & Firetruck', exampleHi: 'सेब और टमाटर', emoji: '🍎' },
  { id: 'blue', en: 'Blue', hi: 'नीला', hex: '#0EA5E9', exampleEn: 'Sky & Ocean', exampleHi: 'आसमान और पानी', emoji: '🌊' },
  { id: 'yellow', en: 'Yellow', hi: 'पीला', hex: '#FACC15', textDark: true, exampleEn: 'Sun & Banana', exampleHi: 'सूरज और केला', emoji: '☀️' },
  { id: 'green', en: 'Green', hi: 'हरा', hex: '#22C55E', exampleEn: 'Leaves & Frog', exampleHi: 'पत्ते और तोता', emoji: '🌿' },
  { id: 'orange', en: 'Orange', hi: 'नारंगी', hex: '#F97316', exampleEn: 'Orange & Carrot', exampleHi: 'संतरा और गाजर', emoji: '🍊' },
  { id: 'pink', en: 'Pink', hi: 'गुलाबी', hex: '#EC4899', exampleEn: 'Lotus & Flamingo', exampleHi: 'कमल का फूल', emoji: '🌸' },
  { id: 'purple', en: 'Violet', hi: 'बैंगनी', hex: '#6366F1', exampleEn: 'Brinjal & Grapes', exampleHi: 'बैंगन और अंगूर', emoji: '🍆' },
  { id: 'brown', en: 'Brown', hi: 'भूरा', hex: '#92400E', exampleEn: 'Teddy Bear & Wood', exampleHi: 'भालू और लकड़ी', emoji: '🐻' },
];

export interface ShapeItem {
  id: string;
  en: string;
  hi: string;
  sidesEn: string;
  sidesHi: string;
  color: string;
}

export const SHAPES_DATA: ShapeItem[] = [
  { id: 'circle', en: 'Circle', hi: 'गोला', sidesEn: 'Round, 0 corners', sidesHi: 'गोल, 0 कोने', color: '#0EA5E9' },
  { id: 'square', en: 'Square', hi: 'चौकोर', sidesEn: '4 equal sides', sidesHi: '4 बराबर भुजाएँ', color: '#F59E0B' },
  { id: 'triangle', en: 'Triangle', hi: 'त्रिकोण', sidesEn: '3 sides & 3 corners', sidesHi: '3 भुजाएँ और 3 कोने', color: '#22C55E' },
  { id: 'rectangle', en: 'Rectangle', hi: 'आयत', sidesEn: '2 long, 2 short sides', sidesHi: '2 लंबी, 2 छोटी भुजाएँ', color: '#EF4444' },
  { id: 'star', en: 'Star', hi: 'तारा', sidesEn: '5 bright points', sidesHi: '5 चमकते कोने', color: '#EAB308' },
  { id: 'heart', en: 'Heart', hi: 'दिल', sidesEn: 'Lovely curved shape', sidesHi: 'प्यारा घुमावदार आकार', color: '#EC4899' },
  { id: 'diamond', en: 'Diamond', hi: 'हीरा', sidesEn: '4 slanted sides', sidesHi: 'पतंग जैसा आकार', color: '#06B6D4' },
  { id: 'oval', en: 'Oval', hi: 'अंडाकार', sidesEn: 'Like an egg', sidesHi: 'अंडे जैसा गोल', color: '#F97316' },
];

export interface SpellingWord {
  word: string;
  hindi: string;
  emoji: string;
  hintEn: string;
  hintHi: string;
  age: AgeGroup;
}

export const SPELLING_WORDS: SpellingWord[] = [
  { word: 'CAT', hindi: 'बिल्ली', emoji: '🐱', hintEn: 'Says Meow!', hintHi: 'म्याऊँ बोलती है!', age: '2-4' },
  { word: 'DOG', hindi: 'कुत्ता', emoji: '🐶', hintEn: 'Friendly pet that barks!', hintHi: 'भौं-भौं करता है!', age: '2-4' },
  { word: 'SUN', hindi: 'सूरज', emoji: '☀️', hintEn: 'Shines bright in the sky!', hintHi: 'दिन में रोशनी देता है!', age: '2-4' },
  { word: 'BUS', hindi: 'बस', emoji: '🚌', hintEn: 'Big vehicle for school!', hintHi: 'स्कूल जाने वाली गाड़ी!', age: '2-4' },
  { word: 'CUP', hindi: 'कप', emoji: '☕', hintEn: 'Holds warm milk or tea!', hintHi: 'इसमें दूध पीते हैं!', age: '2-4' },
  { word: 'FISH', hindi: 'मछली', emoji: '🐠', hintEn: 'Swims in water!', hintHi: 'पानी की रानी है!', age: '5-7' },
  { word: 'LION', hindi: 'शेर', emoji: '🦁', hintEn: 'King of the jungle!', hintHi: 'जंगल का राजा!', age: '5-7' },
  { word: 'STAR', hindi: 'तारा', emoji: '⭐', hintEn: 'Twinkles at night!', hintHi: 'रात में चमकता है!', age: '5-7' },
  { word: 'KITE', hindi: 'पतंग', emoji: '🪁', hintEn: 'Flies high in the wind!', hintHi: 'हवा में उड़ती है!', age: '5-7' },
  { word: 'TREE', hindi: 'पेड़', emoji: '🌳', hintEn: 'Gives us shade and fruits!', hintHi: 'हमें फल और छाया देता है!', age: '5-7' },
  { word: 'APPLE', hindi: 'सेब', emoji: '🍎', hintEn: 'Crunchy red fruit!', hintHi: 'लाल और मीठा फल!', age: '8-10' },
  { word: 'MANGO', hindi: 'आम', emoji: '🥭', hintEn: 'Sweet yellow summer fruit!', hintHi: 'मीठा पीला आम!', age: '8-10' },
  { word: 'TIGER', hindi: 'बाघ', emoji: '🐯', hintEn: 'Orange cat with black stripes!', hintHi: 'धारियों वाला बाघ!', age: '8-10' },
  { word: 'HOUSE', hindi: 'घर', emoji: '🏠', hintEn: 'Where our family lives!', hintHi: 'जहाँ हम रहते हैं!', age: '8-10' },
  { word: 'TRAIN', hindi: 'रेलगाड़ी', emoji: '🚂', hintEn: 'Runs on railway tracks!', hintHi: 'पटरी पर चलती है!', age: '8-10' },
];

export interface BadgeReward {
  id: string;
  requiredStars: number;
  titleEn: string;
  titleHi: string;
  emoji: string;
}

export const BADGE_REWARDS: BadgeReward[] = [
  { id: 'starter_cub', requiredStars: 3, titleEn: 'Little Explorer', titleHi: 'नन्हा खोजी', emoji: '🦁' },
  { id: 'word_owl', requiredStars: 10, titleEn: 'Wise Owl', titleHi: 'समझदार उल्लू', emoji: '🦉' },
  { id: 'math_bunny', requiredStars: 20, titleEn: 'Math Bunny', titleHi: 'गणित खरगोश', emoji: '🐰' },
  { id: 'color_parrot', requiredStars: 35, titleEn: 'Color Parrot', titleHi: 'रंगीन तोता', emoji: '🦜' },
  { id: 'rocket_champ', requiredStars: 50, titleEn: 'Space Champ', titleHi: 'अंतरिक्ष चैंपियन', emoji: '🚀' },
  { id: 'super_elephant', requiredStars: 75, titleEn: 'Super Jumbo', titleHi: 'सुपर हाथी', emoji: '🐘' },
];
