---
layout: post
title: Switching to Vim
author: Jelle
category: general
---

As a fulltime [Textmate](http://macromates.com/) user, I was really happy with my editor. Even with 2 colleagues that try to convince me that [Emacs](http://www.gnu.org/software/emacs/) is the way to go, But I still didn't feel the need to switch. But then one day something popped... The day after I switched to Vim, and until now I'm really glad I did.

### So why would I do this?

Well, I can't lie to you. I wanted something more special than Textmate, everybody uses Textmate these days and I have the impression that more en more developers in the [Rails](http://rubyonrails.org/) community are switching to an editor like Emacs or Vim. And because [Piet](http://twitter.com/junkiesxl) is a die hard Emacs user I wanted to compete with him by using Vim.

### Github

I have my whole Vim configuration on my Github account, just in case my machine desides to explode. You can find it [here](https://github.com/fousa/vim-configuration). This can come in very handy when working on multiple machines, just commit, push and pull and the configuration is identical on both machines! Isn't that just freakin' awesome?

These are some of the features/plugins I added to my configuration:

- Ack (find in project) support
- Emacs-style file finder called Lusty Explorer
- A nice Railscast colorscheme
- Somewhat better full screen support
- A simple strip trailing spaces function

Here is an example screenshot of the colorscheme I use in [MacVim](http://code.google.com/p/macvim/).

![The Railscast colorscheme](http://10to1.blog.s3.amazonaws.com/vim-colorscheme.png)

I'm adding new stuff every day while learning more about Vim.

### Installing my config

First things first, backup your current configuration so you don't have to blame me for ruining your life.

Next up:

- Clone [this repo](https://github.com/fousa/vim-configuration) to .vim/
- Create a simlink for the `.vimrc`: ln -nfs ~/.vim/.vimrc ~/.vimrc
- Create a symlink for the `.gvimrc`: ln -nfs ~/.vim/.gvimrc ~/.gvimrc

And that's all you have to do.

Enjoy!

### Reference

- [Vim](http://www.vim.org/)
- [Vim Plugins](http://www.vim.org/scripts/index.php)
- [MacVim](http://code.google.com/p/macvim/)
- [Vimcasts](http://vimcasts.org/)
- [My configuration repo](https://github.com/fousa/vim-configuration)
