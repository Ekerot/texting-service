Vagrant.configure(2) do |config|

  config.vm.box = "bento/ubuntu-16.04"
  
  # Server port
  config.vm.network "forwarded_port", guest: 8080, host: 8080

  # Client port
  config.vm.network "forwarded_port", guest: 4000, host: 4000

  # Node debug port
  config.vm.network "forwarded_port", guest: 5858, host: 5858
  
  # Configure synced folders
  # Use for Mac/Linux host
  config.vm.synced_folder "./", "/home/vagrant/project"
  # Use for Windows host
  #config.vm.synced_folder "./", "/home/vagrant/project", type: "smb", mount_options: ["vers=3.02","mfsymlinks"]

  # Fix no-tty messages
  config.vm.provision "fix-no-tty", type: "shell" do |s|
      s.privileged = false
      s.inline = "sudo sed -i '/tty/!s/mesg n/tty -s \\&\\& mesg n/' /root/.profile"
  end

  # Update & Install
  config.vm.provision :shell, inline: "apt-get update"
  config.vm.provision :shell, inline: "apt-get install build-essential git -y"

  # Install node 7.x
  config.vm.provision :shell, :inline => "curl -sL https://deb.nodesource.com/setup_7.x | bash - && apt-get -y install nodejs"

end
