//for promptsArr
import Gift from "../assets/Gift.jpg";
import AOS from "../assets/ActOfService.jpg";
import Time from "../assets/Time.jpg";
import Earth from "../assets/Earth.jpg";
import Heart from "../assets/Heart.jpg";
import Compliment from "../assets/Compliment.png";
import Cook from "../assets/Cook.png";
import Surprise from "../assets/Surprise.png";
import Donation from "../assets/Donation.png";
//for navItemArr
import HomeBlack from "../assets/HomeBlack.svg";
import FeedIcon from "../assets/FeedIcon.svg";
import InspirationIcon from "../assets/InspirationIcon.svg";
import inspirationPink from "../assets/inspirationPink.svg";
import JournalIcon from "../assets/JournalIcon.svg";
import journalPink from "../assets/journalPink.svg";
import AccountSettingsIcon from "../assets/AccountSettingsIcon.svg";
import accountPink from "../assets/accountPink.svg";
import classroomIcon from "../assets/classroom.svg";
import classroomPink from "../assets/classroomPink.svg";

//for mediaArr
import TwitterIcon from "../assets/TwitterIcon.svg";
import YoutubeIcon from "../assets/YoutubeIcon.svg";
import InstagramIcon from "../assets/InstagramIcon.svg";
import FacebookIcon from "../assets/FacebookIcon.svg";

export const promptsArr = {
  vibesUp: {
    className: " bg-idle-blue border-[#1c9cd4]",
    buttonClassName: "text-[#1c9cd4]",
    title: "Vibes Up",
    titleClassName: "text-[#1c9cd4]",
    prompts: [
      `Set a timer for 1 minute. For the entire minute continue to write what you love. Complete this sentence over and over in your journal: 
      
      I love_____________________ 
      
      Good tip: (For example, you may consider: What do you love to do? Who are people you love spending time with? Where do you love to go? What lights you up? What makes you happy?) 
      
      If you’re having trouble coming up with things you love, place your hand over your heart. This will help you get out of your thinking brain and allow your heart to express itself.`,
      "Draw a picture of you doing your favorite activity.",
    ],
  },
  heartsOpen: {
    className: "bg-[#e0f0a4] border-[#92b024]",
    buttonClassName: "text-[#92b024]",
    title: "Hearts Open",
    titleClassName: "text-[#92b024]",
    prompts: [
      `Write down 3 things you love about yourself. After you have written them in your journal, place your hand on your heart, close your eyes, take a deep breath in through your nose, exhale out through your mouth as if blowing out birthday candles, open your eyes and read what you have just written to yourself. After each one, take another deep breath, exhale and allow yourself to acknowledge yourself for these unique qualities. 
      
      Follow-up: Turn to your partner and share one of these qualities with them. Ask to listen to one of the things they love about themselves too. Take a moment to see that person on a deeper level.`,
      "Close your eyes and imagine you had a magic wand. Name one way you would use that magic wand to change the world and make it a better place. Draw a picture in your journal that illustrates this world.",
    ],
  },
  upLift: {
    className: "bg-[#ffe9f2] border-[#fc086b]",
    buttonClassName: "text-[#fc086b]",
    title: "Up Lift",
    titleClassName: "text-[#fc086b]",
    prompts: [
      "Close your eyes, take a deep breath, and recall a moment when someone did something for you that made your day better. When you have it in your mind, open your eyes and write about it in your journal. What did they do? How did it make you feel?",
      "Close your eyes, take a deep breath, and recall a time when you did something for someone that made their day better? When you have it in your mind, open your eyes and write about it in your journal. What did you do? Why? How did it make you feel? How do you think the person you helped made them feel?",
      "Set a time for 1 minute. For the entire minute, write down as many ways you can imagine to help brighten people’s days.",
    ],
  },
};

export const inspirationChecklist = [
  { id: 1, label: "Volunteer at a local charity", checked: false },
  { id: 2, label: "Plant trees in your community", checked: false },
  { id: 3, label: "Donate to a food bank", checked: false },
  { id: 4, label: "Mentor someone in need", checked: false },
  {
    id: 5,
    label: "Write positive affirmations and leave them in public spaces",
    checked: false,
  },
  { id: 6, label: "Pay for the person behind you in line", checked: false },
  { id: 7, label: "Organize a neighborhood clean-up", checked: false },
  {
    id: 8,
    label: "Send uplifting messages to friends and family",
    checked: false,
  },
  { id: 9, label: "Support a small, local business", checked: false },
  { id: 10, label: "Adopt or foster a rescue pet", checked: false },
  { id: 11, label: "Share your skills by teaching others", checked: false },
  { id: 12, label: "Participate in a charity run or walk", checked: false },
  { id: 13, label: "Create care packages for the homeless", checked: false },
  {
    id: 14,
    label: "Offer to babysit for a friend or family member",
    checked: false,
  },
  {
    id: 15,
    label: "Share motivational quotes on social media",
    checked: false,
  },
  {
    id: 16,
    label: "Foster a spirit of inclusivity and diversity",
    checked: false,
  },
  { id: 17, label: "Donate blood", checked: false },
  {
    id: 18,
    label: "Send thank-you notes to essential workers",
    checked: false,
  },
  { id: 19, label: "Support fair trade products", checked: false },
  {
    id: 20,
    label: "Practice active listening with those around you",
    checked: false,
  },
  { id: 21, label: "Tutor a student in need", checked: false },
  { id: 22, label: "Offer to help a neighbor with chores", checked: false },
  { id: 23, label: "Organize a community garden", checked: false },
  { id: 24, label: "Share educational resources online", checked: false },
  {
    id: 25,
    label: "Write letters to seniors in nursing homes",
    checked: false,
  },
  { id: 26, label: "Start a community book club", checked: false },
  { id: 27, label: "Compliment strangers", checked: false },
  {
    id: 28,
    label: "Host a fundraiser for a cause you believe in",
    checked: false,
  },
  { id: 29, label: "Practice kindness on social media", checked: false },
  {
    id: 30,
    label: "Help someone with their resume or job search",
    checked: false,
  },
  {
    id: 31,
    label: "Create art or crafts for hospitals or shelters",
    checked: false,
  },
  { id: 32, label: "Be mindful of your environmental impact", checked: false },
  {
    id: 33,
    label: "Share inspirational stories on your platform",
    checked: false,
  },
  { id: 34, label: "Support fair labor practices", checked: false },
  { id: 35, label: "Volunteer at an animal shelter", checked: false },
  {
    id: 36,
    label: "Send care packages to deployed military personnel",
    checked: false,
  },
  { id: 37, label: "Share your favorite recipes with others", checked: false },
  {
    id: 38,
    label: "Be a responsible consumer- choose sustainable products",
    checked: false,
  },
  { id: 39, label: "Participate in community events", checked: false },
  { id: 40, label: "Donate gently used clothing", checked: false },
  {
    id: 41,
    label: "Foster a culture of gratitude in your workplace",
    checked: false,
  },
  { id: 42, label: "Host a virtual game night for friends", checked: false },
  {
    id: 43,
    label: "Write positive Yelp or Google reviews for local businesses",
    checked: false,
  },
  { id: 44, label: "Support educational initiatives", checked: false },
  {
    id: 45,
    label: "Offer your skills pro bono to a nonprofit organization",
    checked: false,
  },
  { id: 46, label: "Create art for public spaces", checked: false },
  {
    id: 47,
    label: "Share educational podcasts or documentaries",
    checked: false,
  },
  {
    id: 48,
    label: "Practice mindfulness and encourage others to do the same",
    checked: false,
  },
  { id: 49, label: "Sponsor a child’s education", checked: false },
  {
    id: 50,
    label: "Initiate conversations about mental health",
    checked: false,
  },
  { id: 51, label: "Organize a neighborhood watch program", checked: false },
  { id: 52, label: "Participate in beach or park cleanup", checked: false },
  {
    id: 53,
    label: "Support initiatives promoting gender equality",
    checked: false,
  },
  { id: 54, label: "Donate to disaster relief effort", checked: false },
  { id: 55, label: "Share your knowledge through tutorials", checked: false },
  { id: 56, label: "Be an advocate for social justice", checked: false },
  { id: 57, label: "Volunteer at a retirement home", checked: false },
  { id: 58, label: "Organize a blood drive in your community", checked: false },
  {
    id: 59,
    label: "Support ethical and sustainable fashion brands",
    checked: false,
  },
  { id: 60, label: "Mentor a young entrepreneur", checked: false },
  { id: 61, label: "Offer your seat to someone in need", checked: false },
  { id: 62, label: "Share motivational playlists", checked: false },
  {
    id: 63,
    label: "Support initiatives promoting clean energy",
    checked: false,
  },
  {
    id: 64,
    label: "Send handwritten letters to friends or family",
    checked: false,
  },
  { id: 65, label: "Host a virtual talent show", checked: false },
  { id: 66, label: "Participate in a community watch program", checked: false },
  {
    id: 67,
    label: "Advocate for recycling and waste reduction",
    checked: false,
  },
  { id: 68, label: "Share mental health resources", checked: false },
  {
    id: 69,
    label: "Create art for hospitals or care facilities",
    checked: false,
  },
  { id: 70, label: "Share educational YouTube channels", checked: false },
  { id: 71, label: "Organize a community picnic or potluck", checked: false },
  { id: 72, label: "Support fair trade coffee", checked: false },
  { id: 73, label: "Donate to wildlife conservation efforts", checked: false },
  { id: 74, label: "Volunteer at a local school", checked: false },
  {
    id: 75,
    label: "Write positive messages on public chalkboards",
    checked: false,
  },
  { id: 76, label: "Sponsor a community event", checked: false },
  { id: 77, label: "Share eco-friendly tips", checked: false },
  {
    id: 78,
    label: "Support initiatives for accessible education",
    checked: false,
  },
  { id: 79, label: "Participate in local government meetings", checked: false },
  { id: 80, label: "Donate to LGBTQ+ organizations", checked: false },
  { id: 81, label: "Share inspiring TED Talks", checked: false },
  { id: 82, label: "Volunteer at a community center", checked: false },
  {
    id: 83,
    label: "Support initiatives for clean water access",
    checked: false,
  },
  { id: 84, label: "Advocate for mental health awareness", checked: false },
  { id: 85, label: "Share resources for job seekers", checked: false },
  { id: 86, label: "Donate to arts and culture organizations", checked: false },
  { id: 87, label: "Host a virtual fundraiser", checked: false },
  {
    id: 88,
    label: "Support initiatives for affordable housing",
    checked: false,
  },
  { id: 89, label: "Share positive news stories", checked: false },
  { id: 90, label: "Volunteer at a youth center", checked: false },
  { id: 91, label: "Donate to cancer research", checked: false },
  {
    id: 92,
    label: "Support initiatives for disabled individuals",
    checked: false,
  },
  {
    id: 93,
    label: "Share resources for domestic violence survivors",
    checked: false,
  },
  { id: 94, label: "Volunteer at a local library", checked: false },
  { id: 95, label: "Advocate for fair wages", checked: false },
  {
    id: 96,
    label: "Support initiatives for refugee assistance",
    checked: false,
  },
  {
    id: 97,
    label: "Donate to organizations combating human trafficking",
    checked: false,
  },
  { id: 98, label: "Share resources for addiction recovery", checked: false },
  { id: 99, label: "Volunteer at a community garden", checked: false },
  {
    id: 100,
    label: "Practice empathy and kindness in every interaction",
    checked: false,
  },
];

export const stickers = [
  {
    value: "sticker1",
    label: "Gift",
    imageSrc: Gift,
  },
  { value: "sticker2", label: "Act of Service", imageSrc: AOS },
  { value: "sticker3", label: "Volunteer", imageSrc: Heart },
  { value: "sticker4", label: "Time", imageSrc: Time },
  { value: "sticker5", label: "Compliment", imageSrc: Compliment },
  { value: "sticker6", label: "Cook", imageSrc: Cook },
  { value: "sticker7", label: "Earth", imageSrc: Earth },
  { value: "sticker8", label: "Surprise", imageSrc: Surprise },
  { value: "sticker9", label: "Donation", imageSrc: Donation },
];

export const navItemArr = [
  ["/home", "Feed", FeedIcon, HomeBlack],
  ["/inspiration", "Inspiration", inspirationPink, InspirationIcon],
  ["/journal", "Journal", journalPink, JournalIcon],
  ["/account", "Account Settings", accountPink, AccountSettingsIcon],
  ["/classroom", "Classroom", classroomPink, classroomIcon],
];

export const colors = {
  A: "#FF8C00",
  B: "#800000",
  C: "#DC143C",
  D: "#FFFF00",
  E: "#008000",
  F: "#FF00FF",
  G: "#008000",
  H: "#FFD700",
  I: "#4B0082",
  J: "#00FF00",
  K: "#BDB76B",
  L: "#800080",
  M: "#FF00FF",
  N: "#000080",
  O: "#FFA500",
  P: "#6495ED",
  Q: "#D19275",
  R: "#FF0000",
  S: "#0000FF",
  T: "#40E0D0",
  U: "#7B68EE",
  V: "#EE82EE",
  W: "#FFFFFF",
  X: "#BC8F8F",
  Y: "#FFFF00",
  Z: "#8A2BE2",
};

export const mediaArr = [
  ["https://twitter.com/goodnessdotlove", TwitterIcon, "Twitter Icon"],
  ["https://www.youtube.com/@spreadgoodnesstv", YoutubeIcon, "Youtube Icon"],
  [
    "https://www.instagram.com/spreadgoodnesstv?igsh=MzRlODBiNWFlZA==",
    InstagramIcon,
    "Instagram Icon",
  ],
  ["", FacebookIcon, "Facebook Icon"],
  ,
];
