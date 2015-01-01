/* -*- mode: js2; js2-basic-offset: 4; indent-tabs-mode: nil -*- */

/***************************************************
 *           SlingShot for Gnome Shell             *
 *                                                 *
 * A clone of SlingShot launcher from ElementaryOS *
 *                                                 *
 * Created by rastersoft, and distributed under    *
 * GPLv2 or later license.                         *
 *                                                 *
 * Code based on Applications Menu, from gcampax   *
 *                                                 *
 ***************************************************/

/* Versions:

     1: First public version
    
*/

const ShellVersion = imports.misc.config.PACKAGE_VERSION.split(".");
const Lang = imports.lang;
const St = imports.gi.St;

const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const Util = imports.misc.util;

const LauncherButton = new Lang.Class({
    Name: 'SlingShot.LauncherButton',
    Extends: PanelMenu.Button,

    _init: function() {

        this.parent(0.0,'SlingShot');
        this.actor.add_style_class_name('panel-status-button');
        this._box = new St.BoxLayout({ style_class: 'panel-status-button-box' });
        this.actor.add_actor(this._box);

        /*this.buttonIcon = new St.Icon({ gicon: null, style_class: 'system-status-icon' });
        this.buttonIcon.icon_name='start-here';
        this._box.add_actor(this.buttonIcon);*/
        this.buttonLabel = new St.Label({ text: _("Applications")});
        this._box.add_actor(this.buttonLabel);
        this._setActivitiesNoVisible(true);
        this.actor.connect('button-release-event', function(element,event) {
            Util.spawn(['slingshot-launcher'])
        });
        Util.spawn(['slingshot-launcher', '-s'])
    },

    destroy: function() {
        this._setActivitiesNoVisible(false);
        this.parent();
    },

    _setActivitiesNoVisible: function(mode) {
        this._activitiesNoVisible=mode;
        if (mode) {
            if (ShellVersion[1]>4) {
                let indicator = Main.panel.statusArea['activities'];
                if(indicator != null)
                    indicator.container.hide();
            } else {
                Main.panel._activitiesButton.actor.hide();
            }
        } else {
            if (ShellVersion[1]>4) {
                let indicator = Main.panel.statusArea['activities'];
                if(indicator != null)
                    indicator.container.show();
            } else {
                Main.panel._activitiesButton.actor.show();
            }
        }
    },

});

let SlingShotButton;

function enable() {
    SlingShotButton = new LauncherButton();
    let pos=0;

    if (ShellVersion[1]>4) {
        Main.panel.addToStatusArea('slingshot-menu', SlingShotButton, 0, 'left');
    } else {
        Main.panel._leftBox.insert_child_at_index(SlingShotButton.actor,0);
        Main.panel._menus.addMenu(SlingShotButton.menu);
    }
}

function disable() {
    SlingShotButton.destroy();
}

function init(extensionMeta) {

}

