'use client';
import React from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { entities, type Entity } from '@/lib/types';
import { Logo } from '@/components/icons';

interface ChatSidebarProps {
  selectedEntity: Entity;
  setSelectedEntity: (entity: Entity) => void;
}

export default function ChatSidebar({
  selectedEntity,
  setSelectedEntity,
}: ChatSidebarProps) {
  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Logo className="w-8 h-8 text-primary" />
          <span className="text-lg font-headline font-bold">ICC NET</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-0">
        <SidebarGroup>
          <SidebarGroupLabel>Entities</SidebarGroupLabel>
          <SidebarMenu>
            {entities.map((entity) => {
              const Icon = entity.icon;
              return (
                <SidebarMenuItem key={entity.name}>
                  <SidebarMenuButton
                    tooltip={{
                      children: (
                        <>
                          <p className="font-bold">{entity.name}</p>
                          <p className="text-muted-foreground">
                            {entity.description}
                          </p>
                        </>
                      ),
                      className: 'w-48',
                    }}
                    onClick={() => setSelectedEntity(entity.name)}
                    isActive={selectedEntity === entity.name}
                    aria-label={entity.name}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{entity.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
