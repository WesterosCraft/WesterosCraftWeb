export const styles = {
  global: (props: any) => ({
    '#__next, html, body': {
      height: '100%',
    },
    'html, body': {
      background: 'primary',
      color: 'primaryDark',
      minHeight: '100%',
    },
    '.no-bg-scrollbar': {
      scrollbarColor: 'rgba(255, 255, 255, 0.35) transparent',
    },
    '.no-bg-scrollbar::-webkit-scrollbar, .no-bg-scrollbar::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '.no-bg-scrollbar:hover::-webkit-scrollbar-thumb, .no-bg-scrollbar:focus::-webkit-scrollbar-thumb, .no-bg-scrollbar:focus-within::-webkit-scrollbar-thumb, .no-bg-scrollbar:active::-webkit-scrollbar-thumb':
      {
        backgroundColor: 'rgba(255, 255, 255, 0.35)',
        border: '4px solid transparent',
        backgroundClip: 'content-box',
        borderRadius: '10px',
      },
    '.no-bg-scrollbar::-webkit-scrollbar-thumb:hover, .no-bg-scrollbar::-webkit-scrollbar-thumb:active':
      {
        backgroundColor: 'rgba(255, 255, 255, 0.35) !important',
      },
  }),
};
