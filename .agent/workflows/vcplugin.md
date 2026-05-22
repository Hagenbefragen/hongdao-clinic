---
description: Add new features to VC/Stream rooms using the plugin system
---

# /vcplugin - Add VC/Stream Features Safely

// turbo-all

## Overview
This workflow guides you through adding new features to the VC (Video Conference) or Stream views using the plugin architecture. **Never modify the core view files directly!**

## Architecture

```
frontend/components/vc/
├── VCView.tsx              # Entry point ONLY - DO NOT ADD FEATURES HERE
├── core/
│   ├── StreamView.tsx      # LOCKED - Stream UI
│   └── ConferenceView.tsx  # LOCKED - VC UI
├── controls/               # Shared UI components
│   ├── ControlBar.tsx
│   ├── ViewerBadge.tsx
│   └── ModeBadge.tsx
├── plugins/                # ✅ ADD NEW FEATURES HERE
│   ├── types.ts            # Plugin interface
│   ├── registry.ts         # Plugin registration
│   └── [YourPlugin].tsx    # Your new feature!
└── hooks/                  # Shared hooks
    ├── useAutoHideControls.ts
    └── useViewerCount.ts
```

## Steps to Add a New Feature

### 1. Create Plugin File

Create a new file in `frontend/components/vc/plugins/`:

```typescript
// frontend/components/vc/plugins/MyFeaturePlugin.tsx
import React from 'react';
import { VCPlugin, VCPluginProps } from './types';

const MyFeatureComponent: React.FC<VCPluginProps> = ({ context, isActive, onClose }) => {
    const { roomId, isHost, viewerCount, sendData } = context;
    
    if (!isActive) return null;
    
    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
            <div className="bg-gray-900 p-6 rounded-xl">
                <h2>My Feature</h2>
                <p>Room: {roomId}, Viewers: {viewerCount}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

// Control bar button (optional)
const MyFeatureButton: React.FC<{ onClick: () => void; isActive: boolean }> = ({ onClick, isActive }) => (
    <button
        onClick={onClick}
        className={`w-12 h-12 rounded-full ${isActive ? 'bg-indigo-600' : 'bg-gray-700'}`}
        title="My Feature"
    >
        ⭐
    </button>
);

// Plugin definition
export const myFeaturePlugin: VCPlugin = {
    id: 'my-feature',
    name: 'My Feature',
    description: 'Description of what this feature does',
    position: 'modal',  // 'overlay-top-left', 'control-bar', 'sidebar', etc.
    
    // Visibility rules
    showForHost: true,
    showForGuest: false,
    showInStream: true,
    showInVC: true,
    
    // Components
    Component: MyFeatureComponent,
    ControlButton: MyFeatureButton,
    icon: '⭐',
    iconTooltip: 'My Feature'
};
```

### 2. Register the Plugin

Add your plugin to the registry in `frontend/components/vc/plugins/index.ts`:

```typescript
// frontend/components/vc/plugins/index.ts
import { vcPluginRegistry } from './registry';
import { myFeaturePlugin } from './MyFeaturePlugin';

// Register all plugins
export function registerAllPlugins() {
    vcPluginRegistry.register(myFeaturePlugin, { priority: 10 });
}

// Export for direct access
export { myFeaturePlugin };
```

### 3. Test Your Plugin

1. Build: `cd frontend && npm run build`
2. Check for TypeScript errors
3. Test locally before deploying

### 4. Deploy

```powershell
cd frontend
npm run build
Compress-Archive -Path ./dist/* -DestinationPath ./frontend-dist.zip -Force
scp -i C:\Users\Hagen\.ssh\ohm-clean-1 ./frontend-dist.zip root@188.245.235.51:/var/www/ohm/frontend/
ssh -i C:\Users\Hagen\.ssh\ohm-clean-1 root@188.245.235.51 "cd /var/www/ohm/frontend && unzip -o frontend-dist.zip && rm frontend-dist.zip"
```

## Plugin Positions

| Position | Description | Example Use |
|----------|-------------|-------------|
| `overlay-top-left` | Floating overlay | Stats, badges |
| `overlay-top-right` | Floating overlay | Viewer count |
| `overlay-bottom-left` | Floating overlay | Chat preview |
| `overlay-bottom-right` | Floating overlay | Quick actions |
| `control-bar` | Inside control bar | Toggle buttons |
| `sidebar` | Tools sidebar | Complex tools |
| `modal` | Full-screen modal | Settings, forms |

## Context Available

Every plugin receives a `VCPluginContext` with:

```typescript
{
    roomId: string;
    room: Room | undefined;
    isHost: boolean;
    isStreamGuest: boolean;
    localParticipant: LocalParticipant;
    participants: RemoteParticipant[];
    viewerCount: number;
    elapsedMinutes: number;
    sessionCost: number;
    xomBalance: number;
    creatorId?: string | number;
    pricePerMinute: number;
    controlsVisible: boolean;
    sendData: (message: any) => void;
    setXomBalance: (balance: number) => void;
    onLeave: () => void;
}
```

## ❌ NEVER Do This

- ❌ Edit `VCView.tsx` directly for new features
- ❌ Edit `StreamView.tsx` for feature additions
- ❌ Add imports to core files
- ❌ Modify `ControlBar.tsx` for single-use features

## ✅ Always Do This

- ✅ Create a new plugin file
- ✅ Register in the plugin registry
- ✅ Set proper visibility rules (host/guest/stream/vc)
- ✅ Test both Stream and VC modes
- ✅ Add tooltips to control buttons
