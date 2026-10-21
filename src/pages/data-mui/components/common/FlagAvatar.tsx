import Avatar from '@mui/material/Avatar';

type Props = {
  png: string;
  alt?: string;
  size?: number;
};

export const FlagAvatar = ({ png, alt = 'Flag', size = 32 }: Props) => (
  <Avatar
    src={png}
    alt={alt}
    variant="rounded"
    sx={{ width: size, height: Math.round(size * 0.67), borderRadius: 0.5 }}
    slotProps={{ img: { loading: 'lazy' } }}
  />
);
