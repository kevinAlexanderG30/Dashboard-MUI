import React, { useState, useRef, FC } from 'react';
import { Box, MenuItem } from '@mui/material';
import { submodulos } from '@/utils/submodulos';
import {SubMenuItems} from "@/types/submenu.d.types";


interface DropdownListProps {
    anchorRef: HTMLElement | null;
    items: SubMenuItems[];
    depth: number;
    openPath: number[];
    onItemEnter: (id: number, depth: number) => () => void;
    onItemLeave: (depth: number) => () => void;
}

export default function FileDropdown() {
    const [openPath, setOpenPath] = useState<number[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const labelRefs = useRef<Record<number, HTMLElement | null>>({});

    const rootItems = submodulos.filter(item => item.parent_id === null);

    const handleContainerLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
            setOpenPath([]);
        } else {
            return;
        }
    };

    const handleItemEnter = (id: number, depth: number) => () => {
        setOpenPath(prev => {
            const next = prev.slice(0, depth);
            next[depth] = id;
            return next;
        });
    };

    const handleItemLeave = (depth: number) => () => {
        setOpenPath(prev => prev.slice(0, depth));
    };

    return (
        <Box
            ref={containerRef}
            sx={{ position: 'relative', display: 'flex', gap: 2 }}
            onMouseLeave={handleContainerLeave}
        >
            {/* Labels raíz */}
            {rootItems.map((item: SubMenuItems) => (
                <Box
                    key={item.id}
                    ref={el => (labelRefs.current[item.id] = el)}
                    component={item.url_path ? 'a' : 'span'}
                    href={item.url_path || undefined}
                    onMouseEnter={item.isMenu ? handleItemEnter(item.id, 0) : undefined}
                    sx={{ cursor: item.isMenu ? 'pointer' : 'default', px: 2, py: 1 }}
                >
                    {item.nombre}
                </Box>
            ))}

            {/* Solo renderiza submenú si hay un root activo */}
            {openPath[0] && labelRefs.current[openPath[0]] && (
                <DropdownList
                    anchorRef={labelRefs.current[openPath[0]]}
                    items={rootItems.find(r => r.id === openPath[0])?.menus || []}
                    depth={1}
                    openPath={openPath}
                    onItemEnter={handleItemEnter}
                    onItemLeave={handleItemLeave}
                />
            )}
        </Box>
    );
}



const  DropdownList: FC<DropdownListProps> = ({ anchorRef, items, depth, openPath, onItemEnter, onItemLeave } ) => {
    if (!items || items.length === 0) return null;
    const isSubmenu = depth > 1;
    const positionStyle = anchorRef
        ? {
            top: isSubmenu ? 10 : anchorRef.offsetTop + anchorRef.offsetHeight,
            left: isSubmenu ? '100%' : anchorRef.offsetLeft,
        }
        : {};

    // const positionStyle = anchorRef
    //     ? {
    //         top: isSubmenu ? anchorRef.offsetTop : anchorRef.offsetTop + anchorRef.offsetHeight + 1,
    //         left: isSubmenu ? anchorRef.offsetLeft + anchorRef.offsetWidth : anchorRef.offsetLeft,
    //     }
    //     : {};

    return (
        <Box
            component="ul"
            sx={{
                listStyle: 'none',
                m: 0,
                p: 0,
                position: 'absolute',
                ...positionStyle,
                backgroundColor: 'background.paper',
                boxShadow: 3,
                minWidth: 180,
                zIndex: (theme) => theme.zIndex.modal,
            }}
        >
            {items.map((item: SubMenuItems) => (
                <MenuItem
                    key={item.id}
                    component={item.url_path ? 'a' : 'li'}
                    href={item.url_path || undefined}
                    onMouseEnter={item.menus?.length > 0 ? onItemEnter(item.id, depth) : undefined}
                    onMouseLeave={item.menus?.length > 0 ? onItemLeave(depth) : undefined}
                    sx={{
                        position: 'relative',
                    }}
                >
                    {item.nombre}
                    {/* Renderiza submenú si coincide y hay elementos */}
                    {item.menus?.length > 0 && openPath[depth] === item.id && (
                        <DropdownList
                            anchorRef={anchorRef}
                            items={item.menus}
                            depth={depth + 1}
                            openPath={openPath}
                            onItemEnter={onItemEnter}
                            onItemLeave={onItemLeave}
                        />
                    )}
                </MenuItem>
            ))}
        </Box>
    );
}
