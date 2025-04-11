import React from "react";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { type Persona } from "@/data/personas";
import { FaGithub } from "react-icons/fa";

interface ChatHeaderProps {
  activePersonas: Persona[];
  isSelectionView: boolean;
  onBackClick: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  activePersonas,
  isSelectionView,
  onBackClick,
}) => {
  return (
    <header className="sticky top-0 z-10 border-b border-dark-100 bg-dark-400/80 backdrop-blur-md p-4">
      <div className="md:max-w-[1500px] max-w-4xl mx-auto flex items-center justify-between">
        {isSelectionView ? (
          <h1 className="text-xl font-bold text-white">
            ☕ Chai With AI Buddies
          </h1>
        ) : (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={onBackClick}
              className="mr-2 text-muted-foreground hover:text-white hover:bg-dark-300"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-3 flex-1">
              {activePersonas.length === 1 ? (
                <>
                  <Avatar className="h-8 w-8 border border-orange-500/50">
                    <img
                      src={activePersonas[0].avatar}
                      alt={activePersonas[0].name}
                    />
                  </Avatar>
                  <span className="font-medium">{activePersonas[0].name}</span>
                </>
              ) : (
                <>
                  <AvatarGroup>
                    {activePersonas.map((persona) => (
                      <Avatar
                        key={persona.id}
                        className="h-8 w-8 border border-orange-500/50"
                      >
                        <img src={persona.avatar} alt={persona.name} />
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  <span className="font-medium">Group Chat</span>
                </>
              )}
            </div>
          </>
        )}
        <a
          href="https://github.com/Aasuyadav1/ChatWithCode"
          target="_blank"
        >
          <FaGithub className="text-3xl" />
        </a>
      </div>
    </header>
  );
};

export default ChatHeader;
