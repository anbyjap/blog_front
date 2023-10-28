import { ListItem, ListItemText, Divider } from '@mui/material';

interface props {
  content: string;
  handleClose?: () => void;
}

const makeTitleShoter = (title: string): string => {
  if (title.length > 10) {
    return `${title.slice(0, 10)}...`;
  }
  return title;
};

export const TitleList = (props: props) =>
  props.content
    .split('\n')
    .filter((line) => line.startsWith('#'))
    .map((title, index) => {
      const currentUrl = new URL(window.location.href);
      currentUrl.hash = title.replace('# ', '');
      return (
        <div key={index}>
          <ListItem onClick={props.handleClose ? props.handleClose : () => {}}>
            <ListItemText>
              <a
                href={currentUrl.href}
                style={{
                  display: 'block', // Ensure the anchor tag behaves like a block element
                  whiteSpace: 'normal', // Allow wrapping of text
                  wordBreak: 'break-word', // Break words to prevent overflow
                }}
              >
                {makeTitleShoter(title.replace('# ', ''))}
              </a>
            </ListItemText>
          </ListItem>
          <Divider />
        </div>
      );
    });
