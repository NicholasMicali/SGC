import React, { useState } from 'react';

const InspirationPage = () => {
  // Define your list of items here, each with a checked state
  const [items, setItems] = useState([
    { id: 1, label: "Volunteer at a local charity", checked: false },
    { id: 2, label: "Plant trees in your community", checked: false },
    { id: 3, label: "Donate to a food bank", checked: false },
    { id: 4, label: "Mentor someone in need", checked: false },
    { id: 5, label: "Write positive affirmations and leave them in public spaces", checked: false },
    { id: 6, label: "Pay for the person behind you in line", checked: false },
    { id: 7, label: "Organize a neighborhood clean-up", checked: false },
    { id: 8, label: "Send uplifting messages to friends and family", checked: false },
    { id: 9, label: "Support a small, local business", checked: false },
    { id: 10, label: "Adopt or foster a rescue pet", checked: false },
    { id: 11, label: "Share your skills by teaching others", checked: false },
    { id: 12, label: "Participate in a charity run or walk", checked: false },
    { id: 13, label: "Create care packages for the homeless", checked: false },
    { id: 14, label: "Offer to babysit for a friend or family member", checked: false },
    { id: 15, label: "Share motivational quotes on social media", checked: false },
    { id: 16, label: "Foster a spirit of inclusivity and diversity", checked: false },
    { id: 17, label: "Donate blood", checked: false },
    { id: 18, label: "Send thank-you notes to essential workers", checked: false },
    { id: 19, label: "Support fair trade products", checked: false },
    { id: 20, label: "Practice active listening with those around you", checked: false },
    { id: 21, label: "Tutor a student in need", checked: false },
    { id: 22, label: "Offer to help a neighbor with chores", checked: false },
    { id: 23, label: "Organize a community garden", checked: false },
    { id: 24, label: "Share educational resources online", checked: false },
    { id: 25, label: "Write letters to seniors in nursing homes", checked: false },
    { id: 26, label: "Start a community book club", checked: false },
    { id: 27, label: "Compliment strangers", checked: false },
    { id: 28, label: "Host a fundraiser for a cause you believe in", checked: false },
    { id: 29, label: "Practice kindness on social media", checked: false },
    { id: 30, label: "Help someone with their resume or job search", checked: false },
    { id: 31, label: "Create art or crafts for hospitals or shelters", checked: false },
    { id: 32, label: "Be mindful of your environmental impact", checked: false },
    { id: 33, label: "Share inspirational stories on your platform", checked: false },
    { id: 34, label: "Support fair labor practices", checked: false },
    { id: 35, label: "Volunteer at an animal shelter", checked: false },
    { id: 36, label: "Send care packages to deployed military personnel", checked: false },
    { id: 37, label: "Share your favorite recipes with others", checked: false },
    { id: 38, label: "Be a responsible consumer- choose sustainable products", checked: false },
    { id: 39, label: "Participate in community events", checked: false },
    { id: 40, label: "Donate gently used clothing", checked: false },
    { id: 41, label: "Foster a culture of gratitude in your workplace", checked: false },
    { id: 42, label: "Host a virtual game night for friends", checked: false },
    { id: 43, label: "Write positive Yelp or Google reviews for local businesses", checked: false },
    { id: 44, label: "Support educational initiatives", checked: false },
    { id: 45, label: "Offer your skills pro bono to a nonprofit organization", checked: false },
    { id: 46, label: "Create art for public spaces", checked: false },
    { id: 47, label: "Share educational podcasts or documentaries", checked: false },
    { id: 48, label: "Practice mindfulness and encourage others to do the same", checked: false },
    { id: 49, label: "Sponsor a child’s education", checked: false },
    { id: 50, label: "Initiate conversations about mental health", checked: false },
    { id: 51, label: "Organize a neighborhood watch program", checked: false },
    { id: 52, label: "Participate in beach or park cleanup", checked: false },
    { id: 53, label: "Support initiatives promoting gender equality", checked: false },
    { id: 54, label: "Donate to disaster relief effort", checked: false },
    { id: 55, label: "Share your knowledge through tutorials", checked: false },
    { id: 56, label: "Be an advocate for social justice", checked: false },
    { id: 57, label: "Volunteer at a retirement home", checked: false },
    { id: 58, label: "Organize a blood drive in your community", checked: false },
    { id: 59, label: "Support ethical and sustainable fashion brands", checked: false },
    { id: 60, label: "Mentor a young entrepreneur", checked: false },
    { id: 61, label: "Offer your seat to someone in need", checked: false },
    { id: 62, label: "Share motivational playlists", checked: false },
    { id: 63, label: "Support initiatives promoting clean energy", checked: false },
    { id: 64, label: "Send handwritten letters to friends or family", checked: false },
    { id: 65, label: "Host a virtual talent show", checked: false },
    { id: 66, label: "Participate in a community watch program", checked: false },
    { id: 67, label: "Advocate for recycling and waste reduction", checked: false },
    { id: 68, label: "Share mental health resources", checked: false },
    { id: 69, label: "Create art for hospitals or care facilities", checked: false },
    { id: 70, label: "Share educational YouTube channels", checked: false },
    { id: 71, label: "Organize a community picnic or potluck", checked: false },
    { id: 72, label: "Support fair trade coffee", checked: false },
    { id: 73, label: "Donate to wildlife conservation efforts", checked: false },
    { id: 74, label: "Volunteer at a local school", checked: false },
    { id: 75, label: "Write positive messages on public chalkboards", checked: false },
    { id: 76, label: "Sponsor a community event", checked: false },
    { id: 77, label: "Share eco-friendly tips", checked: false },
    { id: 78, label: "Support initiatives for accessible education", checked: false },
    { id: 79, label: "Participate in local government meetings", checked: false },
    { id: 80, label: "Donate to LGBTQ+ organizations", checked: false },
    { id: 81, label: "Share inspiring TED Talks", checked: false },
    { id: 82, label: "Volunteer at a community center", checked: false },
    { id: 83, label: "Support initiatives for clean water access", checked: false },
    { id: 84, label: "Advocate for mental health awareness", checked: false },
    { id: 85, label: "Share resources for job seekers", checked: false },
    { id: 86, label: "Donate to arts and culture organizations", checked: false },
    { id: 87, label: "Host a virtual fundraiser", checked: false },
    { id: 88, label: "Support initiatives for affordable housing", checked: false },
    { id: 89, label: "Share positive news stories", checked: false },
    { id: 90, label: "Volunteer at a youth center", checked: false },
    { id: 91, label: "Donate to cancer research", checked: false },
    { id: 92, label: "Support initiatives for disabled individuals", checked: false },
    { id: 93, label: "Share resources for domestic violence survivors", checked: false },
    { id: 94, label: "Volunteer at a local library", checked: false },
    { id: 95, label: "Advocate for fair wages", checked: false },
    { id: 96, label: "Support initiatives for refugee assistance", checked: false },
    { id: 97, label: "Donate to organizations combating human trafficking", checked: false },
    { id: 98, label: "Share resources for addiction recovery", checked: false },
    { id: 99, label: "Volunteer at a community garden", checked: false },
    { id: 100, label: "Practice empathy and kindness in every interaction", checked: false }
  ]);

  // Function to handle checkbox change
  const handleCheckboxChange = (id) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setItems(newItems);
  };

  return (
    <div className="flex-grow flex flex-col items-center overflow-auto p-4">
      <div className="self-start text-[4rem] font-bold">Inspiration Page</div>
        <hr className="w-full border-t-2 border-idle-pink my-4" />
      <style>
        {`
          :root {
            --color-styles-system-grey-light: rgba(241, 245, 249, 1);
            --fff-4f-2: rgba(255, 255, 255, 1);
          }
          .checkbox {
            appearance: none;
            background-color: var(--color-styles-system-grey-light);
            border-radius: 4px;
            height: 30px;
            width: 30px;
            cursor: pointer;
            position: relative;
          }
          .checkbox:checked {
            background-color: var(--color-styles-system-grey-light);
          }
          .checkbox:checked::after {
            content: '✔';
            position: absolute;
            // top: 3px;
            // left: 7px;
            top:50%;
            left:50%;
            transform: translate(-50%, -50%);
            font-size: 22px;
            color: #FD3B8A;
          }
        `}
      </style>
      <div>
        {items.map(item => (
           <div key={item.id} style={item.checked ? { textDecoration: 'line-through' } : {}} className="flex mb-4">
          <input
            type="checkbox"
            id={`checkbox-${item.id}`}
            name={`checkbox-${item.id}`}
            checked={item.checked}
            onChange={() => handleCheckboxChange(item.id)}
            className="checkbox"
          />
          <label htmlFor={`checkbox-${item.id}`} style={{ marginLeft: '8px', fontSize: '20px' }}>{item.label}</label>
        </div>
      ))}
      </div>  
    </div>
  );
};

export default InspirationPage;