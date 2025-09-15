int 
file_read(struct file *f, char *addr, int n) 
{ 
  if (f->type == FD_INODE)
  { 
    if (f->fs_type == EXT4) 
    { 
      /* lógica específica do ext4 */  
    } else if (f->fs_type == BTRFS) 
    { 
      /* lógica específica do btrfs */ 
    } else if (f->fs_type == XFS) 
    { 
      /* lógica específica do btrfs */  
    } 
  } else if (f->type == FD_DEVICE_FILE)
  {
      if (f->dev_type == TTY) 
      { 
        /* lógica específica do terminal */ 
      }
  }
  /* ... */
}