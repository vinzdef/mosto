<?php

/*
Plugin Name: ACF Hotspots Field
Plugin URI: PLUGIN_URL
Description: Adds a field to capture coordinates relative to specified images
Version: 0.2
Author: Six Socks Studio
Author URI: http://sixsocks.studio
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

// exit if accessed directly
if( ! defined( 'ABSPATH' ) ) exit;


// check if class already exists
if( !class_exists('acf_plugin_image_mapping') ) :

class acf_plugin_image_mapping {
	function __construct() {
		// vars
		$this->settings = array(
			'version'	=> '1.0.0',
			'url'		=> plugin_dir_url( __FILE__ ),
			'path'		=> plugin_dir_path( __FILE__ )
		);

		load_plugin_textdomain( 'acf-image_mapping', false, plugin_basename( dirname( __FILE__ ) ) . '/lang' );

		// include field
		add_action('acf/include_field_types', 	array($this, 'include_field_types')); // v5
		add_action('acf/register_fields', 		array($this, 'include_field_types')); // v4
	}

	function include_field_types( $version = false ) {
		// support empty $version
		if( !$version ) $version = 4;
		if ( 5 != $version ) {
			add_action( 'admin_notices', array( $this, 'not_compatible' ) );
			return;
		}

		// include
		include_once('fields/acf-image_hotspots.php');
	}

	function not_compatible() {
		?>
			<div class="notice notice-error is-dismissible">
			<p><?php _e( 'ACF: Image Hotspots Field is only compatible for ACF v5+!', 'sample-text-domain' ); ?></p>
			</div>
		<?php
	}

}


// initialize
new acf_plugin_image_mapping();


// class_exists check
endif;

?>