const formatDate = (date: string) => {
  //months short name
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  let d = new Date(date);
  //new date
  let day = d.getDate();
  let month = d.getMonth();
  let year = d.getFullYear();
  let hours = d.getHours();
  let minutes = d.getMinutes();

  return `${day} ${months[month]} ${
    new Date().getFullYear() !== year ? year : ''
  } ${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  } ${hours < 12 ? 'AM' : 'PM'}`;
};

export default formatDate;
